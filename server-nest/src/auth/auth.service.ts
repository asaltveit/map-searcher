import { Injectable, ConflictException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma.service";
import { AgentsService } from "../agents/agents.service";
import { User } from "@prisma/client";
import { isPrismaError } from "../common/types";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private agentsService: AgentsService,
  ) {}

  async register(
    email: string,
    password: string,
  ): Promise<{ id: string; email: string; role: string; createdAt: Date }> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: { email, password: hashedPassword, role: "user" },
        select: { id: true, email: true, role: true, createdAt: true },
      });

      // Create default agent for new user
      try {
        const userName = email.split("@")[0];
        await this.agentsService.createDefaultAgent(user.id, userName);
        this.logger.log(`Created default agent for new user: ${user.id}`);
      } catch (agentError) {
        // Log but don't fail registration if agent creation fails
        this.logger.warn(
          `Failed to create default agent for user ${user.id}:`,
          agentError,
        );
      }

      return user;
    } catch (error: unknown) {
      // Handle duplicate email (Prisma P2002)
      if (isPrismaError(error) && error.code === "P2002") {
        throw new ConflictException("Email already exists");
      }
      throw error;
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: { email: string; id: string; role: string }): {
    access_token: string;
  } {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
