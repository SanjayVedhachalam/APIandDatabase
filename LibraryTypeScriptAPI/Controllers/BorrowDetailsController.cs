using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using LibraryTypeScriptAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace LibraryTypeScriptAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //Getting Borrow details
        //GET: api/BorrowDetails
        [HttpGet]
        public IActionResult GetBorrowDetails()
        {
            return Ok(_dbContext.borrows.ToList());
        }

        //Getting particular borrow details
        //GET: api/BorrowDetails/1
        [HttpGet("{id}")]
        public IActionResult GetBorrow(int id)
        {
            var borrow = _dbContext.borrows.FirstOrDefaultAsync(borrows => borrows.BorrowID == id);
            if(borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Add a new borrow detail
        //POST: api/BorrowDetail
        [HttpPost]
        public IActionResult PostBorrow([FromBody] BorrowDetails borrow)
        {
            _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok();
        }

        //Update a borrow detail
        //PUT: api/BorrowDetails
        [HttpPut("{id}")]
        public IActionResult PutBorrow(int id, [FromBody] BorrowDetails borrow)
        {
            var index = _dbContext.borrows.FirstOrDefault(borrows => borrows.BorrowID == id);
            if(index == null)
            {
                return NotFound();
            }
            index.BookID = borrow.BookID;
            index.UserID = borrow.UserID;
            index.BorrowedDate = borrow.BorrowedDate;
            index.BorrowBookCount = borrow.BorrowBookCount;
            index.Status = borrow.Status;
            index.PaidFineAmount = borrow.PaidFineAmount;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}