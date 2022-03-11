using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IPaymentRepository
    {
        IEnumerable<Payment> GetPayments();
        Payment GetPayment(int id);
        int InsertPayment(Payment payment);
        bool UpdatePayment(Payment payment);
        bool DeletePayment(int id);
    }
}
