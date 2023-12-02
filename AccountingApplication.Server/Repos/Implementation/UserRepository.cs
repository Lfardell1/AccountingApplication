using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Accounting.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using AccountingApplication.Server.Interfaces;
using Accounting.Database;
using System.Security.Cryptography;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Mvc;
using AccountingApplication.Server.Token;

namespace AccountingApplication.Server.Repos.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _context;
        private string _Key = "Super-Secret-Key";

        public UserRepository(DatabaseContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<Users>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<Users> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<Users> LoginAsync(string username, string password)
        {
            // Find the user by username and password
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);

            if (user == null)
            {
                // User not found or password doesn't match
                return null;
            }


            return user;
        }


        public async Task<Users> UpdateUserAsync(int id, Users user)
        {
            var existingUser = await _context.Users.FindAsync(id);
            if (existingUser != null)
            {
                existingUser.Username = user.Username;
                existingUser.Password = user.Password;

                await _context.SaveChangesAsync();
            }
            return existingUser;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var userToRemove = await _context.Users.FindAsync(id);
            if (userToRemove != null)
            {
                _context.Users.Remove(userToRemove);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<Users> CreateUserAsync(Users user)
        {
            try
            {
                // Add the new user to the context
                _context.Users.Add(user);

                // Save changes asynchronously
                await _context.SaveChangesAsync();

                // Return the newly created user
                return user;
            }
            catch (Exception ex)
            {
                // Handle exceptions: Log or throw an error
                // Example: Log the exception
                Console.WriteLine($"Error creating user: {ex.Message}");
                throw; // Rethrow the exception or handle it based on your application's needs
            }
        }

    }
}