import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID
// D - Dependency Inversion Principle
// Instead of the class intantiate our dependencies they will
// receive it as parameters

export class RegisterUseCase {
  // private usersRepository: any

  constructor(
    private usersRepository: UsersRepository
  ){}
  
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest) {

    // Generating a hash from hash, six rounds
    // Hash quantity may cause performance issues - 6 is the optimal value
    const password_hash = await hash(password, 6)
    // $2a$06$lKASl1LU8ZfrDwpwcc2iH.BnnQQKr5649V47tUUggT24WlIE8kKt6

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
