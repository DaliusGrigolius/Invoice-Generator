using InvoiceApp.Repo.Models;

namespace InvoiceApp.Services
{
    public interface ICountryService
    {
        //Task<IDictionary<string, Country>> GetCountries();
        List<CountriesModel> GetCountries();
    }
}