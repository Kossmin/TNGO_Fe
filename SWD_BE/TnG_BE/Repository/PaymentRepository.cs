using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;

namespace TodoApi.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly TnGContext _context;
        public PaymentRepository (TnGContext context)
        {
            _context = context;
        }
        public bool DeletePayment(int id)
        {
            var p = _context.Payments.Find(id);
            _context.Payments.Remove(p);
            return true;
        }

        public Payment GetPayment(int id)
        {
            var p = _context.Payments.Find(id);
            return p;
        }

        public IEnumerable<Payment> GetPayments()
        {
            var ps = _context.Payments.ToList();
            return ps;
        }

        public int InsertPayment(Payment payment)
        {
            _context.Payments.Add(payment);
            _context.SaveChanges();
            return payment.Id;
        }

        public bool UpdatePayment(Payment payment)
        {
            _context.Payments.Update(payment);
            int rows = _context.SaveChanges();
            return rows > 0;
        }
    }
}
