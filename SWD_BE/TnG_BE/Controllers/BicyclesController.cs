#nullable disable
using Enities.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using TnG_BE.DTO;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/bicycle")]
    [ApiController]
    //[Authorize]
    public class BicyclesController : ControllerBase
    {
        private readonly TnGContext _context;
        private IBicycleRepository bicycleRepo;
        private IStationRepository stationRepo;
        private IBicycleTypeRepository bicycleTypeRepo;
        public BicyclesController(TnGContext context)
        {
            this.bicycleRepo = new BicycleRepository(context);
            this.stationRepo = new StationRepository(context);
            this.bicycleTypeRepo = new BicycleTypeRepository(context);
            _context = context;
        }

        // GET: api/v1/bicycles
        [AllowAnonymous]
        [HttpGet]
        public ActionResult GetBicycles(int page)
        {
            int totalBicycle = bicycleRepo.GetBicycles().Count();                                                 //Get the Number of total Bicycle
            int totalPage = totalBicycle / 10;                                                                    //Create Total Page
            if (totalBicycle % 10 != 0) totalPage++;

            IEnumerable<Bicycle> bs = bicycleRepo.GetBicycles().AsQueryable()
                .Join(stationRepo.GetStations(), x => x.StationId, y => y.Id, (x, y) => new Bicycle(x, y))
                .Join(bicycleTypeRepo.GetBicycleTypes(), x => x.TypeId, y => y.Id, (x, y) => new Bicycle(x, y))
                .Skip(page * 10).Take(10);                                                                        //Get all Bicycle with other obj and Paging

            if (page > totalPage)                                                                                 //If searched page > Total page
            {
                return BadRequest();
            }

            BicycleDTO bicycles = new BicycleDTO(bs, totalPage, page += 1);                                       //Obj include Bicycle list, total page, page index
            var json = JsonConvert.SerializeObject(bicycles, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });
            //Convert Obj to json

            return Content(json, "application/json");
        }
        // GET: api/v1/bicycles/5
        [AllowAnonymous]
        [HttpGet(template: "get/{id}")]
        public ActionResult GetBicycle(int id)
        {
            Bicycle b = bicycleRepo.GetBicycle(id);


            b.Station = stationRepo.GetStation(b.StationId);
            b.Type = bicycleTypeRepo.GetBicycleType(b.TypeId);

            var json = JsonConvert.SerializeObject(b, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        [AllowAnonymous]
        [HttpGet(template: "search-type")]
        public ActionResult SearchBicycleByType(int type, int page)
        {
            int totalBicycle = bicycleRepo.GetBicycles().Where(x => x.TypeId == type).Count();                    //Total Bicycle with Type = ?
            int totalPage = totalBicycle / 10;                                                                    //Create Total Page
            if (totalBicycle % 10 != 0) totalPage++;

            if (type == null || page > totalPage) return BadRequest();                                            //Type != null, searched page > Total page

            IEnumerable<Bicycle> bs = bicycleRepo.GetBicycles()                                                   //List Bicycle with Type and Paging
                    .Where(b => b.TypeId == type)
                    .AsQueryable()
                    .Join(stationRepo.GetStations(), x => x.StationId, y => y.Id, (x, y) => new Bicycle(x, y))
                    .Join(bicycleTypeRepo.GetBicycleTypes(), x => x.TypeId, y => y.Id, (x, y) => new Bicycle(x, y))
                    .Skip(page * 10).Take(10);

            BicycleDTO bicycles = new BicycleDTO(bs, totalPage, page += 1);                                        //Obj include Bicycle list, total page, page index
            var json = JsonConvert.SerializeObject(bicycles, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });
            //Json convert
            return Content(json, "application/json");
        }

        [AllowAnonymous]
        [HttpGet(template: "search-plate")]
        public ActionResult SearchBicycleByPlate(string plate, int page)
        {
            if (plate == null) plate = "";

            int totalBicycle = bicycleRepo.GetBicycles().Where(x => x.LicensePlate.ToLower().Contains(plate.ToLower(), StringComparison.OrdinalIgnoreCase)).Count();
            int totalPage = totalBicycle / 10;
            if (totalBicycle % 10 != 0) totalPage++;

            if (page > totalPage) return BadRequest();

            IEnumerable<Bicycle> bs = bicycleRepo.GetBicycles()
                    .Where(b => b.LicensePlate.Contains(plate))
                    .AsQueryable()
                    .Join(stationRepo.GetStations(), x => x.StationId, y => y.Id, (x, y) => new Bicycle(x, y))
                    .Join(bicycleTypeRepo.GetBicycleTypes(), x => x.TypeId, y => y.Id, (x, y) => new Bicycle(x, y))
                    .Skip(page * 10).Take(10);

            BicycleDTO bicycles = new BicycleDTO(bs, totalPage, page += 1);
            var json = JsonConvert.SerializeObject(bicycles, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }

        [AllowAnonymous]
        [HttpGet(template: "avaiable-bicycles")]
        public ActionResult GetAvailableBicycle(int page)
        {
            int totalBicycle = bicycleRepo.GetBicycles().Where(x => x.Status == 1).Count();
            int totalPage = totalBicycle / 10;
            if (totalBicycle % 10 != 0) totalPage++;

            IEnumerable<Bicycle> bs = bicycleRepo.GetBicycles().AsQueryable()
                .Join(stationRepo.GetStations(), x => x.StationId, y => y.Id, (x, y) => new Bicycle(x, y))
                .Join(bicycleTypeRepo.GetBicycleTypes(), x => x.TypeId, y => y.Id, (x, y) => new Bicycle(x, y))
                .Where(x => x.Status == 1)
                .Skip(page * 10).Take(10);

            if (bs == null || page > totalPage)
            {
                return BadRequest();
            }

            BicycleDTO bicycles = new BicycleDTO(bs, totalPage, page += 1);
            var json = JsonConvert.SerializeObject(bicycles, Formatting.Indented, new JsonSerializerSettings { PreserveReferencesHandling = PreserveReferencesHandling.None });

            return Content(json, "application/json");
        }
        // PUT: api/v1/bicycles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutBicycle([FromBody] BicycleViewModel bViewModel, int id)
        {
            try
            {
                Bicycle b = new Bicycle
                {
                    Id = id,
                    Status = bViewModel.Status,
                    Description = bViewModel.Description,
                    StationId = bViewModel.StationId,
                    LicensePlate = bViewModel.LicensePlate,
                    Image = bViewModel.Image,
                    TypeId = bViewModel.TypeId,
                };
                bicycleRepo.UpdateBicycle(b);
            }
            catch (DataException)
            {
                return "Update Failed";
            }
            return "Update Success";
        }
        [HttpPut(template: "status-update")]
        public String UpdateBicycleStatus(int id, int status)
        {
            Bicycle b = bicycleRepo.GetBicycle(id);
            try
            {
                b.Status = status;
                bicycleRepo.UpdateBicycle(b);
            }
            catch (DataException)
            {
                return "Update Failed";
            }
            return "Update Success";
        }

        [HttpPut(template: "station-update")]
        public String StationStatus(int BicycleId, int StationId)
        {
            try
            {
                Bicycle b = bicycleRepo.GetBicycle(BicycleId);
                b.StationId = StationId;
                bicycleRepo.UpdateBicycle(b);
            }
            catch (DataException)
            {
                return "Update Failed";
            }
            return "Update Success";
        }
        // POST: api/v1/bicycles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostBicycle([FromBody] BicycleViewModel bViewModel)
        {
            int id = bicycleRepo.GetBicycles().OrderBy(x => x.Id).Last().Id + 1;
            try
            {
                Bicycle b = new Bicycle
                {
                    Id = id,
                    Status = bViewModel.Status,
                    Description = bViewModel.Description,
                    StationId = bViewModel.StationId,
                    LicensePlate = bViewModel.LicensePlate,
                    Image = bViewModel.Image,
                    TypeId = bViewModel.TypeId,
                };

                bicycleRepo.InsertBicycle(b);
            }
            catch (Exception)
            {
                return "Add Failed";
            }

            return "Add Success";
        }

        // DELETE: api/v1/bicycles/5
        [HttpDelete("{id}")]
        public String DeleteBicycle(int id)
        {
            if (BicycleExists(id))
            {
                try
                {
                    bicycleRepo.DeleteBicycle(id);
                }
                catch (Exception)
                {
                    return "Delete Failed";
                }
            }
            return "Delete Success";
        }

        private bool BicycleExists(int id)
        {
            return _context.Bicycles.Any(e => e.Id == id);
        }
    }
}
