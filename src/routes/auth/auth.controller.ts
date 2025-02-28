import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, SerializeOptions, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { register } from 'module'
import { LoginBodyDTO, LoginResDTO, RefreshTokenBodyDTO, RefreshTokenResDTO, RegisterBodyDTO, RegisterResDTO } from './auth.dto'
import { RefreshToken } from '@prisma/client'
import { AccessTokenGuard } from 'src/share/guards/access-token-guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @SerializeOptions({type: RegisterResDTO})
  @Post('register')
    async register(@Body() body: RegisterBodyDTO) {
    console.log('controller...')
    // return 'register'
    return new RegisterResDTO(await this.authService.register(body))
  }
  @Post('login')
    async login(@Body() body: LoginBodyDTO) {
    return new LoginResDTO(await this.authService.login(body))
  }
  

  @UseGuards(AccessTokenGuard)
  @Post("refesh-token")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: RefreshTokenBodyDTO){
    console.log('123')
    return new RefreshTokenResDTO(await this.authService.refreshToken(body.refreshToken))
  }
}
