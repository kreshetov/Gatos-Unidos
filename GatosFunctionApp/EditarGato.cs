using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using System.Text.Json;

namespace GatosFunctionApp
{
    public static class EditarGato
    {
        [FunctionName("EditarGato")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Editando JSON del gato seleccionado.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            // Parsear el JSON para obtener el id
            var gatoActualizado = JsonDocument.Parse(requestBody).RootElement;
            string id = gatoActualizado.GetProperty("id").GetString(); // Usar GetString(), no GetRawText()

            // Leer la cadena de conexión del App Settings (configuración de la Function)
            string connectionString = Environment.GetEnvironmentVariable("AzureWebStorage");
            string containerName = "datos";
            string blobName = $"gato_{id}.json"; // Añade la extensión .json si tus blobs la tienen

            // Crear cliente blob y obtener referencia al blob específico
            var containerClient = new BlobContainerClient(connectionString, containerName);
            var blobClient = containerClient.GetBlobClient(blobName); // aquí GetBlobClient, no Getclient

            // Convertir el string JSON a un stream para subirlo
            using (var ms = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(requestBody)))
            {
                await blobClient.UploadAsync(ms, overwrite: true);
            }

            return new OkObjectResult($"Gato con id {id} actualizado correctamente.");
        }
    }
}
