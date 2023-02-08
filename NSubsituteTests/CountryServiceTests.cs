namespace NSubsituteTests
{
    public class CountryServiceTests
    {
        [Fact]
        public void GetCountries_Success_ReturnsListOfCountriesModel()
        {
            // Arrange
            var countryService = Substitute.For<ICountryService>();

            List<CountriesModel> countriesModels = new List<CountriesModel>
            {
                new CountriesModel 
                { 
                    Name = "", 
                    Alpha2Code = "", 
                    Region = "", 
                    Flag = new Flag { Small = "", Medium = "", Large = "" }, 
                    Vat = 0 
                }
            };

            countryService.GetCountries().Returns(countriesModels);

            // Act
            var result = countryService.GetCountries();

            // Assert
            countryService.Received().GetCountries();
            Assert.IsAssignableFrom<List<CountriesModel>>(result);
            Assert.NotEmpty(result);
        }
    }
}