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

           
             var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
              
            

           
            if (user == null)
            {
                // User not found or password doesn't match
                return null;
                
            }
            else {
                bool VerifiedPass = PasswordHasher.VerifyPassword(password, user.Password);
                if (VerifiedPass == false)
                {
                    return null;
                }


                return user;

            }




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
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                throw new Exception("Username already exists");
            }

  
            string hashedPassword = PasswordHasher.HashPassword(user.Password);
            user.Password = hashedPassword;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

    }
}