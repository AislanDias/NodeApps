import { FastifyRequest, FastifyReply } from "fastify"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function register(request : FastifyRequest, reply : FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

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

  if (userWithSameEmail){
    return reply.status(409).send()
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })

  return reply.status(201).send()
}
