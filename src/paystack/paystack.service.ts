import { Injectable } from '@nestjs/common';
import { CreatePaystackDto } from './dto/create-paystack.dto';
import axios from 'axios';
import { UpdatePaystackDto } from './dto/update-paystack.dto';

@Injectable()
export class PaystackService {
  private readonly secretKey = process.env.PAYSTACK_SECRET_KEY;
  private readonly baseUrl = process.env.PAYSTACK_BASE_URL;
  async InitializeTransaction(email: string, amount: number, callbackUrl: string) {
   try {
    const response = await axios.post(`${this.baseUrl}/transaction/initialize`, {
      email,
      amount,
      callback_url: callbackUrl
    }, {
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json"
      }
    }
    )
    return response.data
   } catch (error) {
    console.log(error)
    return error
   }
  }

  async verifyTransaction(reference: string) {
  try {
    const response = await axios.get(`${this.baseUrl}/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json"
      }
    }
    )
    return response.data
  } catch (error) {
   console.log(error) 
   return error
  }
  }
  findAll() {
    return `This action returns all paystack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paystack`;
  }

  update(id: number, updatePaystackDto: UpdatePaystackDto) {
    return `This action updates a #${id} paystack`;
  }

  remove(id: number) {
    return `This action removes a #${id} paystack`;
  }
}
