import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
  name: string
  email : string
  password : string
}

export async function registerUseCase( {
  name,
  email,
  password
} : RegisterUseCaseRequest ){
  // Generating a hash from hash, six rounds
  // Hash quantity may cause performance issues - 6 is the optimal value
  const password_hash = await hash(password, 6)
  // $2a$06$lKASl1LU8ZfrDwpwcc2iH.BnnQQKr5649V47tUUggT24WlIE8kKt6

  // FindUnique can only find registers that either unique or primary keys
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }


  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
