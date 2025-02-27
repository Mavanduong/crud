import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashingService } from 'src/share/services/hashing.service';
import { PrismaService } from 'src/share/services/prisma/prisma.service';
import { RegisterBodyDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService // Đổi tên biến đúng chuẩn
  ) {}

  async register(body: RegisterBodyDTO) {
    try {

      if (body.password !== body.confirmPassword) {
        throw new ConflictException('Passwords không khớp');
      }
  
      const hashedPassword = await this.hashingService.hash(body.password);
      const user = await this.prismaService.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: hashedPassword,
        },
      });
  
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      console.error('🔥 Error in register:', error);
      throw new Error('Something went wrong');
    }
  }
  
}
