"use sever"
import axios from "axios"

export interface IFormData {
  email: string
  password: string
}

export const createNewUser = async (formData: any) => {
  const { data } = await axios.post("/api/auth/register", formData)
  return data
}

