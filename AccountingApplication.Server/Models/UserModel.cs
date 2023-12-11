using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Accounting.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }

        public string Password {get; set; }
    }
}
