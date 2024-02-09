import express, { Application } from "express";
import "dotenv/config";

const app: Application = express();

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { healthCheck } from "@config/healthCheck/healthCheck";
import { brandsRouter } from "@modules/brands/router";
import { authRouter } from "@modules/auth/router";

app.use(
	morgan("dev", {
		skip: function (req, res) {
			return res.statusCode < 400;
		},
	})
);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "50mb", type: "application/json" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ROUTES
const apiPrefix = "/api";
app.use("/healthCheck", healthCheck);
app.use(apiPrefix + "/brands", brandsRouter);
app.use(apiPrefix + "/auth", authRouter);

export default app;
