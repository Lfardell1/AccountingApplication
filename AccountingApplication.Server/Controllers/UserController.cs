using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Accounting.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AccountingApplication.Server.Interfaces;
using AccountingApplication.Server.Repos.Implementation;
using Azure.Identity;
using AccountingApplication.Server.Token;
using Microsoft.EntityFrameworkCore;
using NuGet.Common;


namespace AccountingApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {


        private readonly IUserRepository _userRepository;
        private readonly TokenService _tokenService;
        public UserController(IUserRepository userRepository, TokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }


        private static List<Users> users = new List<Users>()
        {
            new Users { Id = 1, Username = "user1", Password = "password1" },
            new Users { Id = 2, Username = "user2", Password = "password2" }
            // Add more users here if needed
        };


        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = users.Find(u => u.Id == id);
            if (user == null)
            {
                return NotFound(); // User not found
            }
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> AddUser(Users newUser)
        {
            try
            {
                

                await _userRepository.CreateUserAsync(newUser);
                var token = _tokenService.GenerateToken(newUser);
                return Ok(new { Token = token, UserDetails = newUser });
            }
            catch (Exception ex)
            {
                return StatusCode(400, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Users user)
        {
            var foundUser = await _userRepository.LoginAsync(user.Username, user.Password);

            if (foundUser == null)
            {
                return Unauthorized(); // Invalid credentials
            }


            // Authentication successful, generate token
            var token = _tokenService.GenerateToken(foundUser);
            // Return token along with additional data if needed
            return Ok(new { Token = token, UserDetails = foundUser }); // Adjust response format as needed
        }



        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var userToRemove = users.Find(u => u.Id == id);
            if (userToRemove == null)
            {
                return NotFound(); // User not found
            }
            users.Remove(userToRemove);
            return NoContent();
        }
    }

}
