﻿using ITIL_Lab_Test.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITIL_Lab_Test.Repositories
{
    public interface IProductRepository: IListRepository<Product>
    {
        Task<List<Product>> SearchProduct(string input);
    }
}
