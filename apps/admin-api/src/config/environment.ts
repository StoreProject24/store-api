/**
 * Validación de variables de ambiente requeridas
 * Se ejecuta al startup de la aplicación
 */

interface EnvironmentVariables {
  PORT: string;
  NODE_ENV: string;
  MONGO_URL: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  AWS_REGION?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_BUCKET_NAME?: string;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

const requiredVars: (keyof EnvironmentVariables)[] = [
  'PORT',
  'NODE_ENV',
  'MONGO_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

export const validateEnvironment = (): void => {
  const missing: string[] = [];

  requiredVars.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    const errorMessage = `
❌ MISSING ENVIRONMENT VARIABLES:
${missing.map((v) => `   - ${v}`).join('\n')}

Please set these variables in your .env file before running the application.
    `;
    console.error(errorMessage);
    process.exit(1);
  }

  console.log('✅ Environment variables validated successfully');
};

export const getEnv = (): EnvironmentVariables => ({
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  MONGO_URL: process.env.MONGO_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
});
