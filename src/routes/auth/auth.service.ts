import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HashingService } from 'src/share/services/hashing.service';
import { PrismaService } from 'src/share/services/prisma.service';
import { LoginBodyDTO, RegisterBodyDTO } from './auth.dto';
import { error } from 'console';
import { TokenService } from 'src/share/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService, // Đổi tên biến đúng chuẩn
    private readonly tokenService: TokenService 
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
      console.error(' Error in register:', error);
      throw new Error('Something went wrong');
    }
  }

  async login(body: LoginBodyDTO){
    const user = await this.prismaService.user.findUnique({
      where: {
        email: body.email
      }
    })
    if(!user){
      throw new UnauthorizedException('Account is not exist')
    }
    const isPasswordMatch = await this.hashingService.compare(body.password,user.password)

    if(!isPasswordMatch){
      throw new UnauthorizedException([
        {
          field: 'password',
          error: 'password is incorrect'
        }
      ])
    }
    const tokens = await this.generateTokens({userId: user.id})
    return tokens
  } 
  async generateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload ), 
      this.tokenService.signRefreshToken(payload )
    ])

    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken);

    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000), // Đổi thành "expiresAt"
      },
    });
    
    return { accessToken, refreshToken };
  }
  


  async refreshToken(refreshToken: string) {
    try {
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken);
  
      // Check if refreshToken exists
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: { token: refreshToken },
      });
  
      // Delete old refreshToken
      await this.prismaService.refreshToken.delete({
        where: { token: refreshToken },
      });
  
      // Generate new tokens
      return this.generateTokens({ userId });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked');
      }
  
      throw new UnauthorizedException();
    }
  }
  }

