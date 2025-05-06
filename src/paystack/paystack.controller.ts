import { Controller, Get, Post,Query,Req,Res, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { CreatePaystackDto } from './dto/create-paystack.dto';
import { UpdatePaystackDto } from './dto/update-paystack.dto';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post("initialize")

  async create(  @Body("email") email:string,
  @Body("amount") amount:number ) {
    console.log(email,amount)
    const callbackUrl = `https://hall-application-system-app.vercel.app/paymentConfirm`  
  const result =  await this.paystackService.InitializeTransaction(email,amount,callbackUrl);
  console.log(result.data.data)
return result.data.data
  }

  @Post("callback")
  async callback(@Body('reference') reference: string) {
    console.log(reference)
    const verification = await this.paystackService.verifyTransaction(reference);

    // Optional: Save payment details to DB here
    // Optional: Redirect user to success/failure page

    return verification;
  }

  @Get()
  findAll() {
    return this.paystackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paystackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaystackDto: UpdatePaystackDto) {
    return this.paystackService.update(+id, updatePaystackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paystackService.remove(+id);
  }
}
