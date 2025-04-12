import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './dto';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    const createdUser = await this.authService.signup(signupDTO);
    return { message: 'user created successfully', data: createdUser };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const token = await this.authService.login(loginDTO);
    return { message: 'done', token };
  }
}
