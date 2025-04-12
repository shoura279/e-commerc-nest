import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TUser } from 'src/DB';
import { UserRepository } from 'src/DB/Models/User/user.repository';
import { compare, hash, sendEmail, TokenService } from '../common';
import { LoginDTO, SignupDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private tokenService: TokenService,
  ) {}

  async signup(signupDTO: SignupDTO): Promise<TUser> {
    const { username, email, password } = signupDTO;
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) throw new ConflictException('user already exist');

    const createdUser = await this.userRepository.create({
      username,
      email,
      password: hash(password),
    });

    await sendEmail({
      to: email,
      from: process.env.EMAIL,
      subject: 'confirm email',
      html: '<p>your otp is 12345</p>',
    });
    return createdUser;
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const { email, password } = loginDTO;
    // check user existence
    const userExist = await this.userRepository.findByEmail(email);
    if (!userExist) throw new NotFoundException('user not found');
    if (!compare(password, userExist.password)) {
      throw new UnauthorizedException('invalid password');
    }
    const token = this.tokenService.sign(
      { _id: userExist._id },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    return token;
  }
}
