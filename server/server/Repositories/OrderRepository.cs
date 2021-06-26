using ITIL_Lab_Test.Models;
using Microsoft.EntityFrameworkCore;
using server.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace ITIL_Lab_Test.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext appDbContext;

        public OrderRepository(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<Order> Add(OrderPlacedViewModel model)
        {

            Order order = null;
            try
            {
                using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    order = new Order
                    {
                        ExpectedDate = model.ExpectedDate,
                        PoDate = model.PoDate,
                        PoNo = model.PoNo,
                        RefId = model.RefId,
                        Remark = model.Remark,
                        SupplierId = model.SupplierId
                    };
                    await appDbContext.Orders.AddAsync(order);
                    await appDbContext.SaveChangesAsync();
                    List<OrderDetails> orderDetails = new List<OrderDetails>();
                    foreach (var item in model.OrderDetails)
                    {
                        var details = new OrderDetails
                        {
                            OrderId = order.Id,
                            ProductId = item.ProductId,
                            Qty = item.Qty
                        };
                        orderDetails.Add(details);
                    }
                    await appDbContext.AddRangeAsync(orderDetails);
                    await appDbContext.SaveChangesAsync();
                    transaction.Complete();
                }
            }
            catch (Exception e)
            {

            }
            return order;
        }
        public async Task<Order> Update(OrderPlacedViewModel model)
        {

            Order order = null;
            try
            {
                order = await appDbContext.Orders.Where(e => e.Id == model.Id.Value)
                    .Include(e => e.OrderDetails).FirstOrDefaultAsync();
                if (order != null)
                {
                    using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                    {
                        order.ExpectedDate = model.ExpectedDate;
                        order.PoDate = model.PoDate;
                        order.PoNo = model.PoNo;
                        order.RefId = model.RefId;
                        order.Remark = model.Remark;
                        order.SupplierId = model.SupplierId;
                        appDbContext.Orders.Update(order);
                        await appDbContext.SaveChangesAsync();
                        List<OrderDetails> updateOrderDetails = new List<OrderDetails>();
                        List<OrderDetails> addOrderDetails = new List<OrderDetails>();
                        foreach (var item in model.OrderDetails)
                        {
                            if (item.Id.HasValue)
                            {

                                var oldDetails = order.OrderDetails.FirstOrDefault(e => e.Id == item.Id.Value);
                                oldDetails.ProductId = item.ProductId;
                                oldDetails.Qty = item.Qty;
                                updateOrderDetails.Add(oldDetails);
                            }
                            else
                            {
                                var details = new OrderDetails
                                {
                                    OrderId = order.Id,
                                    ProductId = item.ProductId,
                                    Qty = item.Qty
                                };
                                addOrderDetails.Add(details);
                            }
                        }
                        DeleteOrderDetails(order.OrderDetails.ToList(), updateOrderDetails);
                        if (updateOrderDetails.Count > 0)
                            appDbContext.UpdateRange(updateOrderDetails);
                        if (addOrderDetails.Count > 0)
                            await appDbContext.AddRangeAsync(addOrderDetails);
                        await appDbContext.SaveChangesAsync();
                        transaction.Complete();
                    }
                }
            }
            catch (Exception e)
            {

            }
            return order;
        }
        public async Task<Order> GetById(long id)
        {
            return await appDbContext.Orders.Where(e => e.Id == id)
                .Include(e => e.OrderDetails)
                .ThenInclude(e => e.Product)
                .FirstOrDefaultAsync();
        }

        public async Task<object> GetForTable()
        {
            try
            {
                return await appDbContext.Orders.Include(e => e.OrderDetails).Include(e => e.Supplier).Select(e => new
                {
                    PoDate = e.PoDate.ToShortDateString(),
                    Supplier = e.Supplier.Name,
                    ExpectedDate = e.ExpectedDate.ToShortDateString(),
                    PoNo = e.PoNo,
                    RefId = e.RefId,
                    Id = e.Id
                }).ToListAsync();
            }
            catch (Exception e)
            {

            }
            return null;
        }

        Task<List<Order>> IListRepository<Order>.GetAll()
        {
            return appDbContext.Orders.Include(e => e.OrderDetails).ToListAsync();
        }
        public void DeleteOrderDetails(List<OrderDetails> oldOrderDetails, List<OrderDetails> newOrderDetails)
        {
            var details = oldOrderDetails.Where(e => !newOrderDetails.Select(x => x.Id).Contains(e.Id)).ToList();
            if(details.Count > 0)
            {
                appDbContext.OrderDetails.RemoveRange(details);
            }
        }

        public async Task<Order> Delete(long id)
        {
            var order = await appDbContext.Orders.Where(e => e.Id == id)
                .Include(e => e.OrderDetails)
                .FirstOrDefaultAsync();
            if(order != null)
            {
                appDbContext.Remove(order);
                await appDbContext.SaveChangesAsync();
                return order;
            }
            return null;
        }
    }
}
