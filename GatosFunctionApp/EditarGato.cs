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
    public class EditarGato
    {
        private readonly ILogger _logger;

        public EditarGato(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EditarGato>();
        }

        private class GatoResumen // Clase para representar el resumen de un gato
        {
            public int id { get; set; } 
            public string nombre { get; set; }
            public string foto { get; set; }
            public string raza { get; set; }
            public string fechaNacimiento { get; set; }
        }

        [Function("EditarGato")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put")] HttpRequestData req)
        {
            try
            {
                _logger.LogInformation("Editando JSON del gato seleccionado.");

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                using JsonDocument jsonDoc = JsonDocument.Parse(requestBody);
                var gatoActualizado = jsonDoc.RootElement;
                int id = gatoActualizado.GetProperty("id").GetInt32();
                string nombre = gatoActualizado.GetProperty("nombre").GetString();
                string foto = gatoActualizado.GetProperty("foto").GetString();
                string raza = gatoActualizado.GetProperty("raza").GetString();
                string fechaNacimiento = gatoActualizado.GetProperty("fechaNacimiento").GetString();

                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                if (string.IsNullOrEmpty(connectionString))
                    throw new Exception("La variable de entorno 'AzureWebJobsStorage' no está configurada.");

                string containerName = "datos";
                var containerClient = new BlobContainerClient(connectionString, containerName);

                // 1. Actualizar JSON completo del gato
                string blobNameGato = $"gato_{id}"; // Nombre del blob para el gato específico
                var blobClientGato = containerClient.GetBlobClient(blobNameGato); // Obtenemos el contenedor del blob

                using (var msGato = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(requestBody)))
                {
                    await blobClientGato.UploadAsync(msGato, overwrite: true);
                }

                // 2. Leer resumen_gatos.json
                string blobNameResumen = "gatos_resumen";
                var blobClientResumen = containerClient.GetBlobClient(blobNameResumen);

                List<GatoResumen> listaResumen = new();

                if (await blobClientResumen.ExistsAsync())
                {
                    var downloadResponse = await blobClientResumen.DownloadContentAsync();
                    string resumenJson = downloadResponse.Value.Content.ToString();

                    // Mejor usar Stream para deserializar
                    using (var stream = new MemoryStream(downloadResponse.Value.Content.ToArray()))
                    {
                        listaResumen = JsonSerializer.Deserialize<List<GatoResumen>>(stream) ?? new List<GatoResumen>();
                    }
                }

                // 3. Buscar y actualizar el gato en el resumen
                var gatoResumen = listaResumen.Find(g => g.id == id);
                if (gatoResumen != null)
                {
                    gatoResumen.nombre = nombre;
                    gatoResumen.foto = foto;
                    gatoResumen.raza = raza;
                    gatoResumen.fechaNacimiento = fechaNacimiento;
                }
                else
                {
                    // Si no existe, agregarlo (opcional)
                    listaResumen.Add(new GatoResumen
                    {
                        id = id,
                        nombre = nombre,
                        foto = foto,
                        raza = raza,
                        fechaNacimiento = fechaNacimiento
                    });
                }

                // 4. Serializar y guardar resumen_gatos actualizado
                string resumenActualizadoJson = JsonSerializer.Serialize(listaResumen, new JsonSerializerOptions { WriteIndented = true });
                using (var msResumen = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(resumenActualizadoJson)))
                {
                    await blobClientResumen.UploadAsync(msResumen, overwrite: true);
                }

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Gato con id {id} y resumen actualizado correctamente.");

                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al actualizar gato: {ex.ToString()}");

                var response = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await response.WriteStringAsync($"Error interno: {ex.Message}");

                return response;
            }
        }
    }
}
