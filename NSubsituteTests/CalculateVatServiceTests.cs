namespace NSubsituteTests
{
    public class CalculateVatServiceTests
    {
        [Fact]
        public void CalculateVat_Returns_CorrectVatRates()
        {
            // Arrange
            var countryService = Substitute.For<ICountryService>();
            countryService.GetCountries().Returns(new List<CountriesModel>
            {
                new CountriesModel { Name = "France", Alpha2Code = "FR", Region = "Europe", Vat = 0.2 },
                new CountriesModel { Name = "Germany", Alpha2Code = "DE", Region = "Europe", Vat = 0.19 },
                new CountriesModel { Name = "USA", Alpha2Code = "US", Region = "North America", Vat = 0.1 },
            });
            var calculateVatService = new CalculateVatService(countryService);

            // Case 1: Provider is not a VAT payer
            var selection1 = new Selection { ProviderCountry = "France", ProviderIsVatPayer = false, ClientCountry = "Germany", ClientIsVatPayer = true };
            var result1 = calculateVatService.CalculateVat(selection1);
            Assert.Equal(0, result1);

            // Case 2: Provider is a VAT payer and client region is not Europe
            var selection2 = new Selection { ProviderCountry = "France", ProviderIsVatPayer = true, ClientCountry = "USA", ClientIsVatPayer = true };
            var result2 = calculateVatService.CalculateVat(selection2);
            Assert.Equal(0, result2);

            // Case 3: Provider and client are in different countries in Europe, and client is not a VAT payer
            var selection3 = new Selection { ProviderCountry = "France", ProviderIsVatPayer = true, ClientCountry = "Germany", ClientIsVatPayer = false };
            var result3 = calculateVatService.CalculateVat(selection3);
            Assert.Equal(0.19, result3);

            // Case 4: Provider and client are in different countries in Europe, and both are VAT payers
            var selection4 = new Selection { ProviderCountry = "France", ProviderIsVatPayer = true, ClientCountry = "Germany", ClientIsVatPayer = true };
            var result4 = calculateVatService.CalculateVat(selection4);
            Assert.Equal(0, result4);

            // Case 5: Provider and client are in the same country
            var selection5 = new Selection { ProviderCountry = "France", ProviderIsVatPayer = true, ClientCountry = "France", ClientIsVatPayer = true };
            var result5 = calculateVatService.CalculateVat(selection5);
            Assert.Equal(0.2, result5);
        }
    }
}
