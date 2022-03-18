#nullable disable
using System;
using System.Collections.Generic;
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
        public IEnumerable<BicycleHistory> GetBicycleHistories(int page)
        {
            IEnumerable<BicycleHistory> bicycleHistories = bHisRepo.GetBicycleHistories().Skip(page * 10).Take(10);
            if(bicycleHistories == null)
            {
                return null;
            }
            foreach (BicycleHistory bH in bicycleHistories)
            {
                bH.Bicycle = bRepo.GetBicycle(bH.BicycleId);
            }
            return bicycleHistories;
        }

        // GET: api/v1/bicycle-histories/get/5
        [HttpGet(template: "get/{id}")]
        public BicycleHistory GetBicycleHistory(int id)
        {
            BicycleHistory bh = bHisRepo.GetBicycleHistory(id);
            if (bh == null)
            {
                return null;
            }
            return bh;
        }

        // PUT: api/v1/bicycle-histories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public bool PutBicycleHistory(int id, BicycleHistory bicycleHistory)
        {
            bHisRepo.InsertBicycleHistory(bicycleHistory);
            return true;
        }

        // POST: api/v1/bicycle-histories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public String PostBicycleHistory(BicycleHistory bicycleHistory)
        {
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
                } catch (Exception ex)
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
