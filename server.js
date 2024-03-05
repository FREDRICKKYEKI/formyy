import fs from "node:fs/promises";
import express from "express";
import bodyParser from "body-parser";
import db from "./db_engine/db.js";
import handleProtectedRoutes, { generateToken } from "./utils.js";
import { authRouter } from "./routers/authRouters.js";
import { formRouter } from "./routers/formRouter.js";
import getServerSideProps from "./helpers/getServerSideProps.js";
import cookieParser from "cookie-parser";
import { miscRouter } from "./routers/miscRouter.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

try {
  await db.authenticate();
  console.log("Connection to the database established successfully..");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}
// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// miscelleneous routes
app.use("/", miscRouter);

// Parse cookies
app.use(cookieParser());

// auth
app.use("/auth", authRouter);

// forms
app.use("/forms", formRouter);

// Serve HTML
app.use("*", handleProtectedRoutes, async (req, res) => {
  const globalProps = { cookies: req.cookies };

  await getServerSideProps(req).then((data) => {
    Object.assign(globalProps, data);
  });

  try {
    const url = req.originalUrl.replace(base, "");
    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(req, ssrManifest);

    //remove cookies from globalProps
    let globalPropsWithoutCookie = Object.fromEntries(
      Object.entries(globalProps).filter(([key]) => key !== "cookies")
    );

    const { redirect } = req;

    if (redirect) {
      return res.status(302).redirect(redirect.to);
    }

    const html = template
      .replace(
        `<!--app-state-->`,
        `window.__GLOBAL_STATE__=${JSON.stringify(globalPropsWithoutCookie)}`
      )
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
