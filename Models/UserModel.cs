using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Device_Store.Models
{
    public class UserModel : IdentityUser
    {
        public List<OrderModel> Orders { get; set; }
    }
}
