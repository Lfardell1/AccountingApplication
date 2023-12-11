using System;
using System.Security.Cryptography;

public class PasswordHasher
{
    private const int SaltSize = 16; // Salt size in bytes
    private const int HashSize = 20; // Hash size in bytes
    private const int Iterations = 10000; // Number of iterations

    public static string HashPassword(string password)
    {
        using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations))
        {
            byte[] salt = algorithm.Salt;
            byte[] hash = algorithm.GetBytes(HashSize);

            // Combine salt and hash into a single string
            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            // Convert to base64 string for storage
            string hashedPassword = Convert.ToBase64String(hashBytes);
            return hashedPassword;
        }
    }

    public static bool VerifyPassword(string enteredPassword, string storedPassword)
    {
        byte[] hashBytes = Convert.FromBase64String(storedPassword);

        // Extract salt and hash from stored password
        byte[] salt = new byte[SaltSize];
        Array.Copy(hashBytes, 0, salt, 0, SaltSize);

        byte[] storedHash = new byte[HashSize];
        Array.Copy(hashBytes, SaltSize, storedHash, 0, HashSize);

        // Compute hash using entered password and stored salt
        using (var algorithm = new Rfc2898DeriveBytes(enteredPassword, salt, Iterations))
        {
            byte[] enteredHash = algorithm.GetBytes(HashSize);

            // Compare computed hash with stored hash
            for (int i = 0; i < HashSize; i++)
            {
                if (enteredHash[i] != storedHash[i])
                {
                    return false; // Passwords don't match
                }
            }
        }
        return true; // Passwords match
    }
}
