using System;
using System.IO;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using System.Text.Json;

namespace GatosFunctionApp
{
    public class InsertarClinica
    {
        private readonly ILogger _logger;

        public InsertarClinica(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<InsertarClinica>();
        }


        private class Clinica
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string foto { get; set; }
            public string especialidad { get; set; }
            public string descripcion { get; set; }
            public string direccion { get; set; }
            public string direccionMapa { get; set; }
            public string telefono { get; set; }
            public string email { get; set; }
            public string web { get; set; }
            public List<string> horario { get; set; }
            public List<string> servicios { get; set; }
            public float valoracion { get; set; }
            public int reseñas { get; set; }

        }

        private class ClinicaResumen
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string foto { get; set; }
            public string especialidad { get; set; }
            public string direccion { get; set; }
        }

        [Function("InsertarClinica")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var nuevaClinica = JsonSerializer.Deserialize<Clinica>(requestBody);

                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                string containerName = "datos";
                string resumenBlobName = "clinicas_resumen";

                var containerClient = new BlobContainerClient(connectionString, containerName);
                var resumenBlobClient = containerClient.GetBlobClient(resumenBlobName);

                List<ClinicaResumen> resumenClinicas;

                if (await resumenBlobClient.ExistsAsync())
                {
                    var resumenDownload = await resumenBlobClient.DownloadAsync();
                    using (var reader = new StreamReader(resumenDownload.Value.Content))
                    {
                        string contenido = await reader.ReadToEndAsync();
                        resumenClinicas = JsonSerializer.Deserialize<List<ClinicaResumen>>(contenido) ?? new List<ClinicaResumen>();
                    }
                }
                else
                {
                    resumenClinicas = new List<ClinicaResumen>();
                }

                int nuevoId = resumenClinicas.Any() ? resumenClinicas.Max(g => g.id) + 1 : 1;
                nuevaClinica.id = nuevoId;

                // Guardar el JSON completo de la clinica
                string blobName = $"clinica_{nuevoId}";
                var gatoBlobClient = containerClient.GetBlobClient(blobName);
                var gatoJson = JsonSerializer.Serialize(nuevaClinica, new JsonSerializerOptions { WriteIndented = true });

                using (var msClinica = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(gatoJson)))
                {
                    await gatoBlobClient.UploadAsync(msClinica, overwrite: true);
                }

                // Actualizar resumen
                var nuevoResumen = new ClinicaResumen
                {
                    id = nuevoId,
                    nombre = nuevaClinica.nombre,
                    foto = nuevaClinica.foto,
                    especialidad = nuevaClinica.especialidad,
                    direccion = nuevaClinica.direccion
                };

                resumenClinicas.Add(nuevoResumen);

                string resumenActualizado = JsonSerializer.Serialize(resumenClinicas, new JsonSerializerOptions { WriteIndented = true });
                using (var msClinicaResumen = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(resumenActualizado)))
                {
                    await resumenBlobClient.UploadAsync(msClinicaResumen, overwrite: true);
                }

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Clinica con ID {nuevoId} insertada correctamente.");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al insertar a la clinica: {ex}");
                var response = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await response.WriteStringAsync($"Error interno: {ex.Message}");
                return response;
            }
        }
    }
}
