#nullable disable
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/bicycle-histories")]
    [ApiController]
    [Authorize]
    public class BicycleHistoriesController : ControllerBase
    {
        private readonly TnGContext _context;
        private IBicycleHistoryRepository bHisRepo;
        private IBicycleRepository bRepo;
        public BicycleHistoriesController(TnGContext context)
        {
            this.bHisRepo = new BicycleHistoryRepository(context);
            this.bRepo = new BicycleRepository(context);
            _context = context;
        }

        // GET: api/v1/bicycle-histories
        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetBicycleHistories(int page)
        {
            IEnumerable<BicycleHistory> bicycleHistories = bHisRepo.GetBicycleHistories().Skip(page * 10).Take(10);
            if (bicycleHistories == null)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(bicycleHistories, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/v1/bicycle-histories/get/5
        [HttpGet(template: "get/{id}")]
        public ActionResult GetBicycleHistory(int id)
        {
            BicycleHistory bh = bHisRepo.GetBicycleHistory(id);
            if (bh == null)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(bh, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // POST: api/v1/bicycle-histories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostBicycleHistory(BicycleHistory bicycleHistory)
        {
            int id = bHisRepo.GetBicycleHistories().OrderBy(x => x.Id).Last().Id + 1;
            bicycleHistory.Id = id;
            bHisRepo.InsertBicycleHistory(bicycleHistory);
            return "Add Success";
        }

        // DELETE: api/v1/bicycle-histories/5
        [HttpDelete("{id}")]
        public String DeleteBicycleHistory(int id)
        {
            BicycleHistory b = bHisRepo.GetBicycleHistory(id);
            if (b != null)
            {
                try
                {
                    bHisRepo.DeleteBicycleHistory(b.Id);
                }
                catch (Exception ex)
                {
                    return "Delete Failed";
                }
            }
            return "Delete Failed";
        }

        private bool BicycleHistoryExists(int id)
        {
            return _context.BicycleHistories.Any(e => e.Id == id);
        }
    }
}
