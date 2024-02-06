import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../users-repository"

// Prisma generates the types automatically
// Because of that we won't need to create a new interface
// we can use it from Prisma

export class PrismaUsersRepository implements UsersRepository{
  async findByEmail(email: string){  
    // FindUnique can only find registers that either unique or primary keys
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}
