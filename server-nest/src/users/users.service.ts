import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all users (id and email only)
   * Used for transfer UI dropdowns
   */
  async findAll(): Promise<Array<{ id: string; email: string }>> {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
      orderBy: { email: "asc" },
    });
  }

  /**
   * Find a user by ID
   * @param id - User ID (UUID)
   * @throws NotFoundException if user does not exist
   */
  async findOne(id: string): Promise<{ id: string; email: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
