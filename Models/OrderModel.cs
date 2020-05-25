using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Device_Store.Models
{
    public class OrderModel
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public int TotalPrice { get; set; }

        public string UserId { get; set; }
        public UserModel User{ get; set; }

        public virtual List<OrderProductModel> OrderProducts { get; set; }
    }
}
