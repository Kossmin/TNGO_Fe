using Enities.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
            private IUserRepository userRepo;
            public PaymentsController(TnGContext context)
            {
                this.paymentRepo = new PaymentRepository(context);
                this.transactionRepo = new TransactionRepository(context);
                this.walletRepo = new WalletRepository(context);
                this.userRepo = new UserRepository(context);
                _context = context;
            }

            // GET: api/Payments
            [HttpGet]
            public ActionResult GetPayments(int page)
            {
                IEnumerable<Payment> ps = paymentRepo.GetPayments().Skip(page * 10).Take(10);
                if (ps == null)
                {
                    return BadRequest();
                }
                var json = JsonConvert.SerializeObject(ps, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

                return Content(json, "application/json");
            }

            // GET: api/Payments/5
            [HttpGet(template: "get/{id}")]
            public ActionResult GetPayment(int id)
            {
                Payment p = paymentRepo.GetPayment(id);
                if (p == null)
                {
                    return BadRequest();
                }
                var json = JsonConvert.SerializeObject(p, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

                return Content(json, "application/json");
            }

            // PUT: api/Payments/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut(template: "update")]
            public String PutPayment([FromBody] PaymentViewModel pViewModel, int paymentId)
            {
                try
                {
                    Payment p = paymentRepo.GetPayment(paymentId);
                    p.Date = pViewModel.Date;
                    p.Type = pViewModel.Type;
                    p.Money = pViewModel.Money;
                    p.TripId = pViewModel.TripId;
                    p.PaymentCode = pViewModel.PaymentCode;
                    paymentRepo.UpdatePayment(p);
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
            public String PostPayment([FromBody] PaymentViewModel pViewModel)
            {
                DateTime payTime = DateTime.Now;
                Transaction t = new Transaction();
                Wallet w = walletRepo.GetWallet(userRepo.GetUser(pViewModel.UserId).Id); //Wallet Id = User Id
                try
                {
                    if (pViewModel.Money > w.Money) return "Not enough Money";

                    w.Money = w.Money - pViewModel.Money;
                    walletRepo.UpdateWallet(w);

                    t.Id = transactionRepo.GetTransactions().OrderBy(x => x.Id).Last().Id + 1;
                    t.Amount = w.Money;
                    t.Date = payTime;
                    t.Description = "Spended " + w.Money;
                    t.WalletId = w.Id;
                    transactionRepo.InsertTransaction(t);

                    Payment p = new Payment
                    {
                        Id = paymentRepo.GetPayments().OrderBy(x => x.Id).Last().Id + 1,
                        Date = payTime,
                        Type = 1,
                        Money = pViewModel.Money,
                        TripId = pViewModel.TripId,
                        TransactionId = t.Id,
                        PaymentCode = pViewModel.PaymentCode,
                    };

                    paymentRepo.InsertPayment(p);
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
