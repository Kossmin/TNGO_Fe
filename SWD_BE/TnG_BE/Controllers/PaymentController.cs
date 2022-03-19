using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    public class PaymentController
    {
        [Route("api/v1/payment")]
        [ApiController]
        [Authorize]
        public class PaymentsController : ControllerBase
        {
            private readonly TnGContext _context;
            private IPaymentRepository paymentRepo;
            private ITransactionRepository transactionRepo;
            private IWalletRepository walletRepo;
            public PaymentsController(TnGContext context)
            {
                this.paymentRepo = new PaymentRepository(context);
                this.transactionRepo = new TransactionRepository(context);
                this.walletRepo = new WalletRepository(context);
                _context = context;
            }

            // GET: api/Payments
            [HttpGet]
            public IEnumerable<Payment> GetPayments(int page)
            {
                IEnumerable<Payment> ss = paymentRepo.GetPayments().Skip(page * 10).Take(10);
                if(ss.Any())
                {
                    return ss;
                }
                return null;
            }

            // GET: api/Payments/5
            [HttpGet(template: "get/{id}")]
            public Payment GetPayment(int id)
            {
                Payment s = paymentRepo.GetPayment(id);
                if (s == null)
                {
                    return null;
                }
                return s;
            }

            // PUT: api/Payments/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutPayment(Payment Payment)
            {
                try
                {
                    paymentRepo.UpdatePayment(Payment);
                }
                catch (Exception)
                {
                    return "Update Failed";
                }
                return "Update Success";
            }

            // POST: api/Payments
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public String PostPayment(Payment Payment)
            {
                try
                {
                    paymentRepo.InsertPayment(Payment);
                }
                catch (Exception)
                {
                    return "Add Failed";
                }
                return "Add Success";
            }

            // DELETE: api/Payments/5
            [HttpDelete("{id}")]
            public String DeletePayment(int id)
            {
                try
                {
                    if (PaymentExists(id))
                    {
                        paymentRepo.DeletePayment(id);
                    }
                }
                catch (Exception)
                {
                    return "Delete Failed";
                }
                return "Delete Success";
            }

            private bool PaymentExists(int id)
            {
                return _context.Payments.Any(e => e.Id == id);
            }
        }
    }
}
