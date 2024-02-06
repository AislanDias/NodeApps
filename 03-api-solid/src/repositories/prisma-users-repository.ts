import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

// Prisma generates the types automatically
// Because of that we won't need to create a new interface
// we can use it from Prisma

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
}
