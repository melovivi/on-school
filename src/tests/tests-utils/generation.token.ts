import { User } from '@/entities/user.entity'
import jwt from 'jsonwebtoken'

export const generateToken = (user: User) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isadmin: user.isadmin,
  }
  return jwt.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: '1h',
  })
}
