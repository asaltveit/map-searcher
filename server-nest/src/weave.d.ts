declare module "weave" {
  export function login(options: { apiKey: string }): Promise<void>;
  export function init(projectName: string): Promise<void>;
  export function op<T>(fn: () => T, options: { name: string }): () => T;
}
