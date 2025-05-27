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
    public class EliminarGato
    {
        private readonly ILogger _logger;

        public EliminarGato(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EliminarGato>();
        }

        private class GatoResumen
        {
            public int id { get; set; }
            public string nombre { get; set; }
            public string foto { get; set; }
            public string raza { get; set; }
            public string fechaNacimiento { get; set; }
        }

        [Function("EliminarGato")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = null)] HttpRequestData req)
        {
            try
            {
                var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
                if (!int.TryParse(query["id"], out int gatoId))
                {
                    var badRequest = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    await badRequest.WriteStringAsync("ID inválido o no proporcionado.");
                    return badRequest;
                }

                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                string containerName = "datos";
                string resumenBlobName = "gatos_resumen";

                var containerClient = new BlobContainerClient(connectionString, containerName);
                
                // Eliminar el blob individual del gato
                var gatoBlobClient = containerClient.GetBlobClient($"gato_{gatoId}");
                await gatoBlobClient.DeleteIfExistsAsync();

                // Leer el resumen y eliminar el gato con el ID
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

                    // Eliminar del resumen
                    var nuevosResumenes = resumenGatos.Where(g => g.id != gatoId).ToList();

                    // Guardar el resumen actualizado
                    string resumenActualizado = JsonSerializer.Serialize(nuevosResumenes, new JsonSerializerOptions { WriteIndented = true });
                    using (var msResumen = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(resumenActualizado)))
                    {
                        await resumenBlobClient.UploadAsync(msResumen, overwrite: true);
                    }
                }

                var response = req.CreateResponse(System.Net.HttpStatusCode.OK);
                await response.WriteStringAsync($"Gato con ID {gatoId} eliminado correctamente.");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al eliminar gato: {ex}");
                var response = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                await response.WriteStringAsync($"Error interno: {ex.Message}");
                return response;
            }
        }
    }
}
