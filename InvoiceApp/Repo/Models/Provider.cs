namespace InvoiceApp.Repo.Models
{
    public class Provider : BaseModel
    {
        public double CompanyCode { get; set; }
        public string? VAT { get; set; }
    }
}
