using AspNetCore.Reporting;
using ITIL_Lab_Test.Models;
using ITIL_Lab_Test.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;
using server.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository orderRepository;
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IProductRepository productRepository;
        private readonly IReportRepository reportRepository;

        public OrderController(IOrderRepository orderRepository, IWebHostEnvironment webHostEnvironment,
            IProductRepository productRepository, IReportRepository reportRepository)
        {
            this.orderRepository = orderRepository;
            this.webHostEnvironment = webHostEnvironment;
            this.productRepository = productRepository;
            this.reportRepository = reportRepository;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<object>))]
        public async Task<IActionResult> Get()
        {
            return Ok(await orderRepository.GetForTable());
        }
        [HttpGet]
        [Route("getById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<object>))]
        public async Task<IActionResult> Get(long id)
        {
            var result = await orderRepository.GetById(id);
            if (result != null)
                return Ok(result);
            return NotFound();
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Order))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Save(OrderPlacedViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await orderRepository.Add(model);
                if (result != null)
                    return Ok(result);
            }
            return BadRequest();

        }
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Order))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(OrderPlacedViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await orderRepository.Update(model);
                if (result != null)
                    return Ok(result);
            }
            return BadRequest();

        }
        [HttpDelete]
        [Route("delete")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(long id)
        {
            if (ModelState.IsValid)
            {
                var result = await orderRepository.Delete(id);
                if (result != null)
                    return Ok(new { StatusCode = StatusCodes.Status204NoContent });
            }
            return NotFound();
        }
        [HttpGet]
        [Route("report")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ReportViewModel))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PrintReport(long id)
        {
            try
            {
                var data = await reportRepository.GetReportByOrderId(id);
                if (data != null)
                {
                    string mimtype = "";
                    int extension = 1;
                    var path = $"{webHostEnvironment.WebRootPath}\\Reports\\OrderDetailsReport.rdlc";
                    Dictionary<string, string> parameters = new Dictionary<string, string>();
                    parameters.Add("PoDate", data.PoDate);
                    parameters.Add("poNo", data.PoNo);
                    parameters.Add("refId", data.RefId);
                    parameters.Add("remark", !string.IsNullOrEmpty(data.Remark)? data.Remark: "[not imported]");
                    parameters.Add("supplier", data.Supplier);
                    parameters.Add("exDate", data.ExpectedDate);
                    parameters.Add("subTotal", data.Subtotal);
                    LocalReport localReport = new LocalReport(path);
                    localReport.AddDataSource("DataSet3", data.Products);
                    var result = localReport.Execute(RenderType.Pdf, extension, parameters, mimtype);
                    byte[] bytes = result.MainStream;
                    string fileName = "Report.pdf";
                    return Ok(File(bytes, "application/pdf", fileName));
                }
                return NotFound();
            }
            catch (Exception e)
            {

            }
            return BadRequest();
        }
    }
}
