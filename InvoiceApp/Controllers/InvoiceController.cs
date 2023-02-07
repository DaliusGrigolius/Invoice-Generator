using InvoiceApp.Repo.Models;
using InvoiceApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly ICalculateVatService _calculateVatService;

        public InvoiceController(ICalculateVatService calculateVatService)
        {
            _calculateVatService = calculateVatService;
        }

        [HttpPost]
        public double Get([FromBody] Selection data)
        {
            var result = _calculateVatService.CalculateVat(data);

            return result;
        }
    }
}

