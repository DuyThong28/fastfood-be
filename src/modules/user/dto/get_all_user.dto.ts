import { IsEnum } from 'class-validator';
import { ROLE } from 'src/constants/enum';
import { PageOptionsDto } from 'src/utils/page_option.dto';

export class GetAllUserDto extends PageOptionsDto {
  @IsEnum(ROLE)
  role: ROLE = ROLE.CUSTOMER;
}
