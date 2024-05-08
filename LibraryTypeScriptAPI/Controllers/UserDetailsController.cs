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
    public class UserDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
        public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext = applicationDBContext;
        }

        //Getting user details
        //GET: api/UserDetails
        [HttpGet]
        public IActionResult GetUserDetails()
        {
            return Ok(_dbContext.users.ToList());
        }

        //Getting particular user details
        //GET: api/UserDetails/1
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbContext.users.FirstOrDefaultAsync(users => users.UserID == id);
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //Adding user details
        //POST: api/UserDetails
        [HttpPost]
        public IActionResult PostUser([FromBody] UserDetails user)
        {
            _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();
        }

        //Updating particular user details
        //PUT: api/UserDetails/1
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, [FromBody] UserDetails user)
        {
            var index = _dbContext.users.FirstOrDefault(users => users.UserID == id);
            if(index == null)
            {
                return NotFound();
            }
            index.UserName = user.UserName;
            index.UserEmail = user.UserEmail;
            index.UserPassword = user.UserPassword;
            index.UserConfirmPassword = user.UserConfirmPassword;
            index.Gender = user.Gender;
            index.Department = user.Department;
            index.MobileNumber = user.MobileNumber;
            index.WalletBalance = user.WalletBalance;
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}