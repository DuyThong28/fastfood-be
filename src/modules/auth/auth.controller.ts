import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { END_POINTS } from 'src/constants/end_points';
import { ApiTags } from '@nestjs/swagger';
import { DOCUMENTATION } from 'src/constants/documentation';
import { SignInByEmailDto } from './dto/sign_in_by_email.dto';
import { ResponseObject } from 'src/utils/object.response';

const {
  AUTH: {
    BASE,
    SIGN_IN_BY_EMAIL,
    SIGN_UP_BY_EMAIL,
    SIGN_OUT,
    REFRESH,
    VERIFY_EMAIL_ACCOUNT,
    RESET_PASSWORD,
    CONFIRM_RESET_PASSWORD,
  },
} = END_POINTS;

@ApiTags(DOCUMENTATION.TAGS.AUTH)
@Controller(BASE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post(SIGN_IN_BY_EMAIL)
  async signInByEmail(@Body() signInByEmailDto: SignInByEmailDto) {
    const result = await this.authService.signInByEmail(signInByEmailDto);
    return ResponseObject.create('Sign in successfully', result);
  }

}
