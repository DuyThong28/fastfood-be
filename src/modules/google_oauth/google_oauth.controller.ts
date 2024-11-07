import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { GoogleOauthGuard } from 'src/common/guards/google-oauth.guard';
import { END_POINTS } from 'src/constants/end_points';
import { ROLE } from 'src/constants/enum';
import { GoogleOauthService } from './google_oauth.service';

const {
  GOOGLE_OAUTH: { BASE, REDIRECT },
} = END_POINTS;
@Controller(BASE)
export class GoogleOauthController {
  constructor(
    private readonly googleOauthService: GoogleOauthService,
    private readonly configService: ConfigService,
  ) {}
  @Get()
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {}
  @Get(REDIRECT)
  @Public()
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.googleOauthService.googleOauth(
      { userData: req.user, role: ROLE.CUSTOMER },
      res,
    );
  }
}
