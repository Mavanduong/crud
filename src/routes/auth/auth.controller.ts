import { Body, ClassSerializerInterceptor, Controller, Post, SerializeOptions, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { register } from 'module'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

// @SerializeOptions({type: RegisterResDTO})
@Post('register')
async  register(@Body() body: RegisterBodyDTO) {
    console.log('controller...')
    // return 'register'
    return new RegisterResDTO(await this.authService.register(body))

    
  }
}
