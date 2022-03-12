#nullable disable
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TnG_BE.Models;
using TodoApi.IRepository;
using TodoApi.Repository;

namespace TnG_BE.Controllers
{
    [Route("api/v1/bicycle")]
    [ApiController]
    [Authorize]
    public class BicyclesController : ControllerBase
    {
        private readonly TnGContext _context;
        private IBicycleRepository bicycleRepo;
        private IStationRepository stationRepo;

        public BicyclesController(TnGContext context)
        {
            this.bicycleRepo = new BicycleRepository(context);
            this.stationRepo = new StationRepository(context);  
            _context = context;
        }

        // GET: api/v1/bicycles
        [HttpGet]
        public IEnumerable<Bicycle> GetBicycles()
        {
            IEnumerable<Bicycle> bs = bicycleRepo.GetBicycles();
            foreach (Bicycle b in bs)
            {
                b.Station = stationRepo.GetStation(b.StationId);
            }
            return bs;
        }

        // GET: api/v1/bicycles/5
        [HttpGet(template: "get/{id}")]
        public Bicycle GetBicycle(int id)
        {
            Bicycle b = bicycleRepo.GetBicycle(id);
            if (b == null)
            {
                return null;
            }

            b.Station = stationRepo.GetStation(b.StationId);

            return b;
        }

        // PUT: api/v1/bicycles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut(template: "update")]
        public String PutBicycle(Bicycle bicycle)
        {
            try
            {
                bicycleRepo.UpdateBicycle(bicycle);
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
        public String StationStatus(Bicycle b, int stationId)
        {
            try
            {
                b.StationId = stationId;
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
        public String PostBicycle(Bicycle bicycle)
        {
            bicycleRepo.InsertBicycle(bicycle);

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
