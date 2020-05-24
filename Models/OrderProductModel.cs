using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Device_Store.Models
{
    public class OrderProductModel
    {
        public int OrderId { get; set; }
        public OrderModel Order { get; set; }
        public int ProductId { get; set; }
        public ProductModel Product { get; set; }

    }
}
