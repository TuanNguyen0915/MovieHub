"use server"

import prisma from "@/prisma/prisma.db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const formData = await req.json()
    const user = await prisma.user.create({
      data: {
        email: formData.email,
        hashPassword: await bcrypt.hash(formData.password, 10),
      },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
