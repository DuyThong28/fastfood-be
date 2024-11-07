import { PrismaService } from 'src/modules/prisma/prisma.service';

const prisma = new PrismaService();
export const isEmailExist = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email: email },
    select: { id: true },
  });
  return user ? true : false;
};
