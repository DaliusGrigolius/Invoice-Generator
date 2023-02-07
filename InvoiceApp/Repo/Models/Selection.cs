namespace InvoiceApp.Repo.Models
{
    public class Selection
    {
        public string? ProviderCountry { get; set; }
        public bool ProviderIsVatPayer { get; set; }
        public string? ClientCountry { get; set; }
        public bool ClientIsVatPayer { get; set; }
    }
}
