using InvoiceApp.Repo.Models;

namespace InvoiceApp.Services
{
    public class CalculateVatService : ICalculateVatService
    {
        private readonly ICountryService _countryService;
        private readonly List<CountriesModel> countries;

        public CalculateVatService(ICountryService countryService)
        {
            _countryService = countryService;
            countries = _countryService.GetCountries();
        }

        public double CalculateVat(Selection data)
        {
            var providerCountry = countries.FirstOrDefault(c => c.Name == data.ProviderCountry);
            var providerRegion = providerCountry?.Region;
            var providerCountryCode = providerCountry?.Alpha2Code;
            var providerIsVatPayer = data.ProviderIsVatPayer;

            var clientCountry = countries.FirstOrDefault(c => c.Name == data.ClientCountry);
            var clientRegion = clientCountry?.Region;
            var clientCountryCode = clientCountry?.Alpha2Code;
            var clientIsVatPayer = data.ClientIsVatPayer;

            if (!providerIsVatPayer)
                return 0;
            if (providerIsVatPayer && clientRegion != "Europe")
                return 0;
            if (providerIsVatPayer && clientRegion == "Europe"
                && !clientIsVatPayer && providerCountry?.Name != clientCountry?.Name) 
                return GetVatRateByCountry(clientCountryCode);
            if (providerIsVatPayer && clientRegion == "Europe" 
                && clientIsVatPayer && providerCountry?.Name != clientCountry?.Name)
                return 0;
            if (providerIsVatPayer && providerCountry?.Name == clientCountry?.Name)
                return GetVatRateByCountry(providerCountryCode);
            return 0;
        }

        private double GetVatRateByCountry(string countryCode)
        {
            double vat = countries.Find(c => c.Alpha2Code == countryCode).Vat;
            return vat;
        }
    }
}