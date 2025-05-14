import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor( private readonly  jwtService :JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    try {
      const payload = this.verifyToken(request)
      console.log(payload)
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true;
  }
  private async verifyToken(request:Request){
    const authHeader = request.headers.authorization
    
    const [type, token] = authHeader.split(' ');


    
    if (type !== 'Bearer' || !token) {

    return  new UnauthorizedException();

    }
    console.log(process.env.JWT_SECRET)
    // Verify the token using the JwtService and return the payload
    const payload = await this.jwtService.verifyAsync(token,{
      secret:process.env.JWT_SECRET
    });
    

    return payload;
  }
}
