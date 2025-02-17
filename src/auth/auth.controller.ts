import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from './auth.guard';
import { User } from 'src/users/users.decorator';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiCreatedResponse({
    schema: {
      example: 'user registerd successfully'
    }
  })
  @ApiBadRequestResponse({
    schema: {
      example: 'user already exists'
    }
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  @ApiBadRequestResponse({
    schema: {
      example: 'Email or password is invalid'
    }
  })
  @ApiCreatedResponse({
    schema: {
      example: {
        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2EzOGQwNmE1YWIxYjBhZWZhYzA3MDgiLCJyb2xlIjoidXNlciIsInN1YnNjcmlwdGlvbiI6ImZyZWUiLCJpYXQiOjE3Mzg3NzIyMzEsImV4cCI6MTczODc3NTgzMX0.haQiuvAoUGMfKC-duyPot2MUxYgnWDm6sTVDta60_yc"
      }
    }
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signin(signInDto)
  }


  @ApiBearerAuth()
  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@User() userId){
    return this.authService.getCurrentUser(userId)
  }
}
