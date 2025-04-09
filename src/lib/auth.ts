import { hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import pool from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface User {
  id: number
  email: string
  fullName: string
  role: string
  verified: boolean
}

export async function signUp(userData: {
  email: string
  password: string
  fullName: string
  role: string
  phone?: string
  organizationName?: string
  address?: string
  emergencyContact?: string
}) {
  try {
    const connection = await pool.getConnection()
    
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [userData.email]
    )
    
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      throw new Error('User already exists')
    }

    // Hash password
    const hashedPassword = await hash(userData.password, 12)

    // Insert user
    const [result] = await connection.execute(
      `INSERT INTO users (email, password, full_name, role, phone, organization_name, address, emergency_contact, verified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userData.email,
        hashedPassword,
        userData.fullName,
        userData.role,
        userData.phone || null,
        userData.organizationName || null,
        userData.address || null,
        userData.emergencyContact || null,
        false
      ]
    )

    connection.release()

    // Generate verification token
    const token = sign(
      { 
        userId: (result as any).insertId,
        email: userData.email,
        role: userData.role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return { token, userId: (result as any).insertId }
  } catch (error) {
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const connection = await pool.getConnection()
    
    // Get user
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    connection.release()

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('User not found')
    }

    const user = users[0] as any

    // Verify password
    const isValid = await compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid password')
    }

    // Generate token
    const token = sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return { 
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
        verified: user.verified
      }
    }
  } catch (error) {
    throw error
  }
}

export async function verifyToken(token: string): Promise<User> {
  try {
    const decoded = verify(token, JWT_SECRET) as any
    return {
      id: decoded.userId,
      email: decoded.email,
      fullName: decoded.fullName,
      role: decoded.role,
      verified: decoded.verified
    }
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export async function verifyAccount(userId: number, verificationCode: string) {
  try {
    const connection = await pool.getConnection()
    
    // In a real application, you would verify the code against a stored code
    // For demo purposes, we'll just verify the account
    await connection.execute(
      'UPDATE users SET verified = true WHERE id = ?',
      [userId]
    )

    connection.release()
    return true
  } catch (error) {
    throw error
  }
} 