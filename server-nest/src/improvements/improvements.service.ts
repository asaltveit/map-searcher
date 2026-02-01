import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

/** Prisma client with Improvement delegate (generated at build time). */
type PrismaWithImprovement = PrismaService & {
  improvement: {
    create: (args: { data: { text: string; userId: string } }) => Promise<{ id: string }>;
    findMany: (args: {
      select?: { userId: true };
      where?: { text: { contains: string; mode: "insensitive" } };
    }) => Promise<Array<{ userId: string }>>;
  };
};

@Injectable()
export class ImprovementsService {
  constructor(private readonly prisma: PrismaService) {}

  private get improvement() {
    return (this.prisma as PrismaWithImprovement).improvement;
  }

  /**
   * Store a user-submitted improvement request.
   * userId comes from UserResolverMiddleware (X-User-Id, cookie, or "default").
   */
  async submit(text: string, userId: string): Promise<{ id: string }> {
    const trimmed = text.trim().slice(0, 2000);
    const row = await this.improvement.create({
      data: { text: trimmed, userId },
    });
    return { id: row.id };
  }

  /**
   * Search improvements by text (ILIKE). Used by improvement PR agent for "users affected".
   * Returns { count, requesters } for PR body.
   */
  async search(query: string): Promise<{ count: number; requesters: string[] }> {
    const q = (query || "").trim().slice(0, 500);
    if (!q) {
      const all = await this.improvement.findMany({
        select: { userId: true },
      });
      const requesters = [...new Set(all.map((r: { userId: string }) => r.userId))] as string[];
      return { count: all.length, requesters };
    }
    const rows = await this.improvement.findMany({
      where: { text: { contains: q, mode: "insensitive" } },
      select: { userId: true },
    });
    const requesters = [...new Set(rows.map((r: { userId: string }) => r.userId))] as string[];
    return { count: rows.length, requesters };
  }
}
