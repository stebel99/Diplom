﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Device_Store.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(150)]
        public string Description { get; set; }

        [Required]
        public bool OutOfStock { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public double Price { get; set; }

        public virtual List<OrderProductModel> OrderProducts { get; set; }
    }
}
