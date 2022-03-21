using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/bicycle-type")]
    [ApiController]
    [Authorize]
    public class BicycleTypeController : ControllerBase
    {
        private readonly TnGContext _context;
        private IBicycleTypeRepository bTypeRepo;

        public BicycleTypeController(TnGContext context)
        {
            this.bTypeRepo = new BicycleTypeRepository(context);
            _context = context;
        }

        // GET: api/BicycleTypes
        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetBicycleTypes()
        {
            IEnumerable<BicycleType> bs = bTypeRepo.GetBicycleTypes();

            var json = JsonConvert.SerializeObject(bs, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // GET: api/BicycleTypes/5
        [AllowAnonymous]
        [HttpGet(template: "get/{id}")]
        public ActionResult GetBicycleType(int id)
        {
            BicycleType b = bTypeRepo.GetBicycleType(id);
            if (b == null)
            {
                return BadRequest();
            }
            var json = JsonConvert.SerializeObject(b, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        // POST: api/BicycleTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostBicycleType(BicycleType BicycleType)
        {
            int id = bTypeRepo.GetBicycleTypes().OrderBy(x => x.Id).Last().Id + 1;
            try
            {
                BicycleType.Id = id;
                bTypeRepo.InsertBicycleType(BicycleType);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Succebs";
        }

        // DELETE: api/BicycleTypes/5
        [HttpDelete("{id}")]
        public String DeleteBicycleType(int id)
        {
            try
            {
                if (BicycleTypeExists(id))
                {
                    bTypeRepo.DeleteBicycleType(id);
                }
            }
            catch (Exception)
            {
                return "Delete Failed";
            }
            return "Delete Succebs";
        }

        private bool BicycleTypeExists(int id)
        {
            return _context.BicycleTypes.Any(e => e.Id == id);
        }
    }
}
