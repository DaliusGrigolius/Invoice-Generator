using InvoiceApp.Repo.Models;
using Newtonsoft.Json;

namespace InvoiceApp.Services
{
    public class CountryService : ICountryService
    {
        private List<CountriesModel>? Countries { get; set; } = new ();

        public CountryService()
        {
            Countries = PopulateCountries();
        }

        private List<CountriesModel>? PopulateCountries()
        {
            string json = File.ReadAllText("./Repo/countriesFinal.txt");
            List<CountriesModel>? countries = JsonConvert.DeserializeObject<List<CountriesModel>>(json);

            return countries;
        }

        public List<CountriesModel> GetCountries()
        {
            return Countries;
        }
    }
}
