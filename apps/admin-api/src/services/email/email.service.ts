import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const basePath = process.env.NODE_ENV === 'production'
  ? path.join(process.cwd(), 'dist', 'apps', 'admin-api', 'templates')
  : path.join(__dirname, '../../templates');

const templates = {
  welcome: fs.readFileSync(path.join(basePath, 'welcome.hbs'), 'utf-8'),
  forgotPassword: fs.readFileSync(path.join(basePath, 'forgotPassword.hbs'), 'utf-8'),
  otpCode: fs.readFileSync(path.join(basePath, 'otpCode.hbs'), 'utf-8'),
};

const EMIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  // @ts-ignore
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMIL_USER,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
  // @ts-ignore
  dnsLookup: (hostname, options, callback) => dns.lookup(hostname, { family: 4 }, callback), // fuerza IPv4
});

const compileTemplate = (html: string, data: any): string => {
  const template = handlebars.compile(html);
  return template(data);
};

export const sendEmail = async (to: string, subject: string, template: keyof typeof templates, data: any) => {
  const html = compileTemplate(templates[template], data);
  return await transporter.sendMail({
    from: EMIL_USER,
    to,
    subject,
    html,
  });
};
