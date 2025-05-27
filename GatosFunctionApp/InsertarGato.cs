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
    public class InsertarGato
    {
        private readonly ILogger _logger;

        public InsertarGato(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<InsertarGato>();
        }


        private class Gato
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string raza { get; set; }
            public string fechaNacimiento { get; set; }
            public string sexo { get; set; }
            public List<string> personalidad { get; set; }
            public float peso { get; set; }
            public bool chip { get; set; }
            public bool vacunado { get; set; }
            public bool esterilizado { get; set; }
            public List<string> disponibilidad { get; set; }
            public string historia { get; set; }
            public string foto { get; set; }
            public string descripcion { get; set; }
        }

        private class GatoResumen
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string foto { get; set; }
            public string raza { get; set; }
            public string fechaNacimiento { get; set; }
        }

        [Function("InsertarGato")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var nuevoGato = JsonSerializer.Deserialize<Gato>(requestBody);

                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                string containerName = "datos";
                string resumenBlobName = "gatos_resumen";

                var containerClient = new BlobContainerClient(connectionString, containerName);
                var resumenBlobClient = containerClient.GetBlobClient(resumenBlobName);

                List<GatoResumen> resumenGatos;

                if (await resumenBlobClient.ExistsAsync())
                {
                    var resumenDownload = await resumenBlobClient.DownloadAsync();
                    using (var reader = new StreamReader(resumenDownload.Value.Content))
                    {
                        string contenido = await reader.ReadToEndAsync();
                        resumenGatos = JsonSerializer.Deserialize<List<GatoResumen>>(contenido) ?? new List<GatoResumen>();
                    }
                }
                else
                {
                    resumenGatos = new List<GatoResumen>();
                }

                int nuevoId = resumenGatos.Any() ? resumenGatos.Max(g => g.id) + 1 : 1;
                nuevoGato.id = nuevoId;

                // Guardar el JSON completo del gato
                string blobName = $"gato_{nuevoId}";
                var gatoBlobClient = containerClient.GetBlobClient(blobName);
                var gatoJson = JsonSerializer.Serialize(nuevoGato, new JsonSerializerOptions { WriteIndented = true });

                using (var ms = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(gatoJson)))
                {
                    await gatoBlobClient.UploadAsync(ms, overwrite: true);
                }

                // Actualizar resumen
                var nuevoResumen = new GatoResumen
                {
                    id = nuevoId,
                    nombre = nuevoGato.nombre,
                    foto = nuevoGato.foto,
                    raza = nuevoGato.raza,
                    fechaNacimiento = nuevoGato.fechaNacimiento
                };

                resumenGatos.Add(nuevoResumen);

                string resumenActualizado = JsonSerializer.Serialize(resumenGatos, new JsonSerializerOptions { WriteIndented = true });
                using (var msResumen = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(resumenActualizado)))
                {
                    await resumenBlobClient.UploadAsync(msResumen, overwrite: true);
                }

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Gato con ID {nuevoId} insertado correctamente.");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al insertar gato: {ex}");
                var response = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await response.WriteStringAsync($"Error interno: {ex.Message}");
                return response;
            }
        }
    }
}
