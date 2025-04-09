import pool from './db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'july24_secret_key_2024'

export async function verifyAccount(userId: number, verificationCode: string) {
  try {
    const connection = await pool.getConnection()
    console.log(`[Auth Lib] Verifying account for userId: ${userId}`)
    // For demo purposes, we assume the code was already validated by the API route
    // and just mark the user as verified.
    await connection.execute(
      'UPDATE users SET is_verified = true WHERE id = ? AND is_verified = false', // Ensure we only update if not already verified
      [userId]
    )
    const result = await connection.execute('SELECT is_verified FROM users WHERE id = ?', [userId])
    connection.release()
    console.log(`[Auth Lib] User ${userId} verification status after update:`, (result[0] as any)?.[0]?.is_verified)
    return true // Indicate success, API route handles specific messaging
  } catch (error) {
    console.error(`[Auth Lib] Error in verifyAccount for userId ${userId}:`, error)
    throw error // Re-throw for the API route to handle
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  console.log("[Auth Lib] Hashing password...")
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log("[Auth Lib] Password hashed.")
  return hash
}

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  console.log("[Auth Lib] Comparing password against stored hash...")
  const isMatch = await bcrypt.compare(password, hashedPassword)
  console.log("[Auth Lib] Password comparison result:", isMatch)
  return isMatch
}

export const generateToken = (userId: number | string, role: string): string => { // Allow number or string for userId flexibility
  console.log(`[Auth Lib] Generating token for userId: ${userId}, role: ${role}`)
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '24h' } // Standard token expiry
  )
}

// This function verifies the JWT token itself (e.g., for protected routes)
export const verifyToken = (token: string): { userId: string; role: string } | null => {
  try {
    console.log("[Auth Lib] Verifying JWT token...")
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string; iat: number; exp: number }
    console.log("[Auth Lib] Token verified successfully for userId:", decoded.userId)
    return { userId: decoded.userId, role: decoded.role } // Return only essential payload
  } catch (error) {
    console.error("[Auth Lib] JWT verification failed:", error instanceof Error ? error.message : error)
    return null // Return null if token is invalid or expired
  }
} 