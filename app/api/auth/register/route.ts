import prisma from "@/prisma/prisma.db"
import bcrypt from "bcrypt"

import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const formData = await req.json()
    let user = await prisma.user.findUnique({
      where: { email: formData.email },
    })
    if (user) {
     return NextResponse.json({ error: "User already exists" })
    }
    user = await prisma.user.create({
      data: {
        email: formData.email,
        hashPassword: bcrypt.hashSync(formData.password, 10),
      },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
