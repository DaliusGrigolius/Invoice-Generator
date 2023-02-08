using InvoiceApp.Repo.Models;

namespace InvoiceApp.Services
{
    public interface ICountryService
    {
        List<CountriesModel> GetCountries();
    }
}