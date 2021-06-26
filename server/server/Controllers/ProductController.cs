using ITIL_Lab_Test.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository productRepository;

        public ProductController(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }
        [HttpGet]
        [Route("search")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<SupplierController>))]
        public async Task<IActionResult> Get(string key)
        {
            return Ok(await productRepository.SearchProduct(key));
        }
    }
}
