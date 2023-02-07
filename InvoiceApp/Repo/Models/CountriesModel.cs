namespace InvoiceApp.Repo.Models
{
    public class CountriesModel
    {
        public string? Name { get; set; }
        public string? Alpha2Code { get; set; }
        public string? Region { get; set; }
        public Flag? Flag { get; set; }
        public double Vat { get; set; }
    }
}
