import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { spawn, execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class ImprovementsCronService {
  private readonly logger = new Logger(ImprovementsCronService.name);

  /** Resolve Python 3 executable: try python3, then python (if it reports Python 3). */
  private getPythonExecutable(): string | null {
    for (const cmd of ["python3", "python"]) {
      try {
        execSync(`${cmd} -c "import sys; sys.exit(0 if sys.version_info.major === 3 else 1)"`, {
          stdio: "pipe",
          encoding: "utf8",
        });
        return cmd;
      } catch {
        continue;
      }
    }
    return null;
  }

  private getRepoRoot(): string | null {
    const envRoot = process.env.IMPROVEMENT_REPO_ROOT;
    if (envRoot && fs.existsSync(envRoot)) return envRoot;
    // When running from server-nest/, repo root is parent
    const parent = path.join(process.cwd(), "..");
    if (fs.existsSync(path.join(parent, "weave-eval", "improvement_agent.py")))
      return parent;
    return null;
  }

  private getAgentScriptPath(repoRoot: string): string {
    const envPath = process.env.IMPROVEMENT_AGENT_SCRIPT_PATH;
    if (envPath) {
      return path.isAbsolute(envPath) ? envPath : path.join(repoRoot, envPath);
    }
    return path.join(repoRoot, "weave-eval", "improvement_agent.py");
  }

  /**
   * Run the improvement PR agent (Python). Returns true if run started and exited 0.
   */
  async runImprovementAgent(): Promise<{ ok: boolean; message: string }> {
    const repoRoot = this.getRepoRoot();
    if (!repoRoot) {
      const msg =
        "Improvement cron skipped: repo root not found. Set IMPROVEMENT_REPO_ROOT to the repo root (containing weave-eval/improvement_agent.py).";
      this.logger.warn(msg);
      return { ok: false, message: msg };
    }

    const scriptPath = this.getAgentScriptPath(repoRoot);
    if (!fs.existsSync(scriptPath)) {
      const msg = `Improvement cron skipped: script not found at ${scriptPath}. Set IMPROVEMENT_AGENT_SCRIPT_PATH if needed.`;
      this.logger.warn(msg);
      return { ok: false, message: msg };
    }

    const backlogPath =
      process.env.IMPROVEMENT_BACKLOG_PATH || "docs/improvement-backlog.md";
    const backlogAbsolute = path.isAbsolute(backlogPath)
      ? backlogPath
      : path.join(repoRoot, backlogPath);
    const index = process.env.IMPROVEMENT_CRON_INDEX ?? "0";

    const python = this.getPythonExecutable();
    if (!python) {
      const msg =
        "Python 3 not found on PATH. Install Python 3 or ensure python3/python is on PATH.";
      this.logger.warn(msg);
      return Promise.resolve({ ok: false, message: msg });
    }

    return new Promise((resolve) => {
      const proc = spawn(python, ["-u", scriptPath, "--backlog", backlogAbsolute, "--index", index], {
        cwd: repoRoot,
        env: { ...process.env },
        stdio: ["ignore", "pipe", "pipe"],
      });

      let stdout = "";
      let stderr = "";
      proc.stdout?.on("data", (chunk) => {
        stdout += chunk.toString();
        this.logger.debug(chunk.toString().trim());
      });
      proc.stderr?.on("data", (chunk) => {
        stderr += chunk.toString();
        this.logger.warn(chunk.toString().trim());
      });

      proc.on("close", (code) => {
        if (code === 0) {
          this.logger.log("Improvement agent completed successfully.");
          resolve({ ok: true, message: stdout.slice(-500) || "OK" });
        } else {
          this.logger.warn(
            `Improvement agent exited with code ${code}. ${stderr.slice(-300)}`,
          );
          resolve({
            ok: false,
            message: stderr.slice(-500) || `Exit code ${code}`,
          });
        }
      });

      proc.on("error", (err) => {
        this.logger.error(`Improvement agent spawn error: ${err.message}`);
        resolve({ ok: false, message: err.message });
      });
    });
  }

  /**
   * Cron: run improvement PR agent on a schedule.
   * Enable with IMPROVEMENT_CRON_ENABLED=true.
   * Schedule via IMPROVEMENT_CRON_SCHEDULE (default: 2am daily).
   */
  @Cron(process.env.IMPROVEMENT_CRON_SCHEDULE ?? CronExpression.EVERY_DAY_AT_2AM)
  async handleScheduledRun(): Promise<void> {
    if (process.env.IMPROVEMENT_CRON_ENABLED !== "true") {
      this.logger.debug(
        "Improvement cron skipped (IMPROVEMENT_CRON_ENABLED is not true).",
      );
      return;
    }
    this.logger.log("Improvement cron: starting run.");
    await this.runImprovementAgent();
  }
}
