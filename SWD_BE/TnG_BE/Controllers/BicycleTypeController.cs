using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<BicycleType> GetBicycleTypes(int page)
        {
            IEnumerable<BicycleType> ss = bTypeRepo.GetBicycleTypes().Skip(page * 10).Take(10);
            if(ss == null)
            {
                return null;
            }
            return ss;
        }

        // GET: api/BicycleTypes/5
        [AllowAnonymous]
        [HttpGet(template: "get/{id}")]
        public BicycleType GetBicycleType(int id)
        {
            BicycleType s = bTypeRepo.GetBicycleType(id);
            if (s == null)
            {
                return null;
            }
            return s;
        }

        // PUT: api/BicycleTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutBicycleType(BicycleType BicycleType)
        {
            try
            {
                bTypeRepo.UpdateBicycleType(BicycleType);
            }
            catch (Exception)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        // POST: api/BicycleTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostBicycleType(BicycleType BicycleType)
        {
            try
            {
                bTypeRepo.InsertBicycleType(BicycleType);
            }
            catch (Exception)
            {
                return "Add Failed";
            }
            return "Add Success";
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
            return "Delete Success";
        }

        private bool BicycleTypeExists(int id)
        {
            return _context.BicycleTypes.Any(e => e.Id == id);
        }
    }
}
