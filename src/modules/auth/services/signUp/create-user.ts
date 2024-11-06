import { BadRequestException } from '@nestjs/common';
import { Gender, Role } from '@prisma/client';
import { USER_IMAGE_URL } from 'src/constants/constant';
import { PrismaService } from 'src/modules/prisma/prisma.service';
type TCreateUserWithEmail = {
  email: string;
  hashedPassword: string;
  fullName: string;
  birthday: Date;
  gender: Gender;
};
type TCreateUserWithPhone = {
  phone: string;
  hashedPassword: string;
  fullName: string;
};

export const createUserWithEmail = async (
  data: TCreateUserWithEmail,
  prismaService: PrismaService,
) => {
  const { email, fullName, hashedPassword, birthday, gender } = data;
  const new_user = await prismaService.users.create({
    data: {
      email: email,
      full_name: fullName,
      password: hashedPassword,
      role: Role.CUSTOMER,
      birthday: new Date(birthday),
      gender: gender,
      avatar_url: USER_IMAGE_URL,
    },
  });
  const user_verification = await prismaService.vertifications.findFirst({
    where: {
      user_id: new_user.id,
    },
  });
  await prismaService.carts.create({
    data: {
      user_id: new_user.id,
    },
  });
  if (user_verification && !user_verification.is_active) {
    throw new BadRequestException(
      'We had sent a verification email to your email, please check your email to verify your account',
    );
  }
  return {
    ...new_user,
  };
};
