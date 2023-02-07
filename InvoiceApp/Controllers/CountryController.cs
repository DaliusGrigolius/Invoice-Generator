using InvoiceApp.Repo.Models;
using InvoiceApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace InvoiceApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public List<CountriesModel> Get()
        {
            var countries = _countryService.GetCountries();

            return countries;
        }
    }
}