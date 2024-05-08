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
    public class BookDetailsController : ControllerBase
    {
       private readonly ApplicationDBContext _dbContext;
       public BookDetailsController(ApplicationDBContext applicationDBContext)
       {
           _dbContext = applicationDBContext;
       }

       //Getting book details
       //GET: api/BookDetails
       [HttpGet]
       public IActionResult GetBookDetails()
       {
        return Ok(_dbContext.books.ToList());
       }

       //Getting a particular book detail
       //GET: api/BookDetails/1
       [HttpGet("{id}")]
       public IActionResult GetBook(int id)
       {
        var book = _dbContext.books.FirstOrDefaultAsync(books => books.BookID == id);
        if(book == null)
        {
            NotFound();
        }
        return Ok(book);
       }

       //Adding a book 
       //POST: api/BookDetails
       [HttpPost]
       public IActionResult PostBook([FromBody] BookDetails book)
       {
        _dbContext.books.Add(book);
        _dbContext.SaveChanges();
        return Ok();
       }

       //Updating a book detail
       //PUT: api/BookDetails
       [HttpPut("{id}")]
       public IActionResult PutBook(int id, [FromBody] BookDetails book)
       {
        var index = _dbContext.books.FirstOrDefault(books => books.BookID == id);
        if(index == null)
        {
            return NotFound();
        }
        index.BookName = book.BookName;
        index.AuthorName = book.AuthorName;
        index.BookCount = book.BookCount;
        _dbContext.SaveChanges();
        return Ok();
       }

       //Delete a book detail
       //DELETE: api/BookDetails/1
       [HttpDelete("{id}")]
       public IActionResult DeleteBook(int id)
       {
        var book = _dbContext.books.FirstOrDefault(books => books.BookID == id);
        if(book == null)
        {
            return NotFound();
        }
        _dbContext.books.Remove(book);
        _dbContext.SaveChanges();
        return Ok();
       }
    }
}