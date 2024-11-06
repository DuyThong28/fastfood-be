import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GOOGLE_STRATEGY } from 'src/constants/constant';

@Injectable()
export class GoogleOauthGuard extends AuthGuard(GOOGLE_STRATEGY) {}
