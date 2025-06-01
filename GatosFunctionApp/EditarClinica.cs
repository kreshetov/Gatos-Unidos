using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Razor;

namespace GatosFunctionApp
{
    public class EditarClinica
    {
        private readonly ILogger _logger;

        public EditarClinica(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EditarGato>();
        }

        private class ClinicaResumen // Clase para representar el resumen de una clinica
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string foto { get; set; }
            public string especialidad { get; set; }
            public string direccion { get; set; }
        }

        [Function("EditarClinica")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put")] HttpRequestData req)
        {
            try
            {
                _logger.LogInformation("Editando JSON de la clinica seleccionada.");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                using JsonDocument jsonDoc = JsonDocument.Parse(requestBody);
                var clinicaActualizada = jsonDoc.RootElement;
                int id = clinicaActualizada.GetProperty("id").GetInt32();
                string nombre = clinicaActualizada.GetProperty("nombre").GetString();
                string foto = clinicaActualizada.GetProperty("foto").GetString();
                string especialidad = clinicaActualizada.GetProperty("especialidad").GetString();
                string direccion = clinicaActualizada.GetProperty("direccion").GetString();

                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                if (string.IsNullOrEmpty(connectionString))
                    throw new Exception("La variable de entorno 'AzureWebJobsStorage' no está configurada.");

                string containerName = "datos";
                var containerClient = new BlobContainerClient(connectionString, containerName);

                // 1. Actualizar JSON completo de la clinica
                string blobNameClinica = $"clinica_{id}"; // Nombre del blob para la clinica especifica
                var blobClientClinica = containerClient.GetBlobClient(blobNameClinica); // Obtenemos el contenedor del blob

                using (var msClinica = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(requestBody)))
                {
                    await blobClientClinica.UploadAsync(msClinica, overwrite: true);
                }

                // 2. Leer clinicas_resume
                string blobNameResumen = "clinicas_resumen";
                var blobClientResumen = containerClient.GetBlobClient(blobNameResumen);

                List<ClinicaResumen> listaResumen = new();

                if (await blobClientResumen.ExistsAsync())
                {
                    var downloadResponse = await blobClientResumen.DownloadContentAsync();
                    string resumenJson = downloadResponse.Value.Content.ToString();

                    // Mejor usar Stream para deserializar
                    using (var stream = new MemoryStream(downloadResponse.Value.Content.ToArray()))
                    {
                        listaResumen = JsonSerializer.Deserialize<List<ClinicaResumen>>(stream) ?? new List<ClinicaResumen>();
                    }
                }

                // 3. Buscar y actualizar a la clinica en el resumen
                var clinicaResumen = listaResumen.Find(g => g.id == id);
                if (clinicaResumen != null)
                {
                    clinicaResumen.nombre = nombre;
                    clinicaResumen.foto = foto;
                    clinicaResumen.especialidad = especialidad;
                    clinicaResumen.direccion = direccion;
                }
                else
                {
                    // Si no existe, agregarlo (opcional)
                    listaResumen.Add(new ClinicaResumen
                    {
                        id = id,
                        nombre = nombre,
                        foto = foto,
                        especialidad = especialidad,
                        direccion = direccion
                    });
                }

                // 4. Serializar y guardar clinicas_resumen actualizado
                string resumenActualizadoJson = JsonSerializer.Serialize(listaResumen, new JsonSerializerOptions { WriteIndented = true });
                using (var msResumen = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(resumenActualizadoJson)))
                {
                    await blobClientResumen.UploadAsync(msResumen, overwrite: true);
                }

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Clinica con id {id} y resumen actualizado correctamente.");

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar la clinica: {ex.ToString()}");

                var response = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await response.WriteStringAsync($"Error interno: {ex.Message}");

                return response;
            }
        }
    }
}
