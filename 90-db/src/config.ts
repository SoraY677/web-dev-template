import "dotenv";

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`環境変数 ${name} が未設定です`);
  return value;
};

export const dbCredentials = {
  host: required("DB_HOST"),
  port: Number(process.env.DB_PORT ?? 5432),
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
  database: required("DB_NAME"),
  ssl: false,
} as const;
