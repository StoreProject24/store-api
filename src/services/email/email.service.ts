import nodemailer from "nodemailer";
import handlebars from "handlebars";

const templates = {
	welcome: require("../../templates/welcome.html"),
	forgotPassword: require("../../templates/forgotPassword.html"),
};

const EMIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
	service: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: EMIL_USER,
		pass: EMAIL_PASSWORD,
	},
});

const compileTemplate = (html: string, data: any): string => {
	const template = handlebars.compile(html);
	return template(data);
};

export const sendEmail = async (
	to: string,
	subject: string,
	template: keyof typeof templates,
	data: any
) => {
	const html = compileTemplate(templates[template], data);
	return await transporter.sendMail({
		from: EMIL_USER,
		to,
		subject,
		html,
	});
};
