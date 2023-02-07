using InvoiceApp.Repo.Models;

namespace InvoiceApp.Services
{
    public interface ICalculateVatService
    {
        double CalculateVat(Selection data);
    }
}