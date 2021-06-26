using ITIL_Lab_Test.Models;
using server.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITIL_Lab_Test.Repositories
{
    public interface IOrderRepository: IListRepository<Order>
    {
        Task<Order> Add(OrderPlacedViewModel model);
        Task<object> GetForTable();
        Task<Order> GetById(long id);
        Task<Order> Update(OrderPlacedViewModel model);
        Task<Order> Delete(long id);
    }
}
