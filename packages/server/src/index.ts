import cors from "cors";
import helmet from "helmet";
import express from "express";
import { contract } from "@post-vote/contract";
import * as swaggerUi from "swagger-ui-express";
import { generateOpenApi } from "@ts-rest/open-api";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

// DB
import { mongo } from "./db";

// controllers
import { PostController } from "./controllers/post.controller";

// entry point
run();

async function run() {
  try {
    await mongo.connect();
    start();
  } catch (error) {
    console.error({ error });
    await mongo.close();
  }
}

function start() {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const openApi = generateOpenApi(
    contract,
    {
      info: { version: "1.0.0", title: "Post & Vote API" },
    },
    { setOperationId: true }
  );
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApi));

  const s = initServer();
  const router = s.router(contract, {
    async getPosts() {
      const body = await PostController.getPosts();
      return { body, status: 200 };
    },
    async getPost({ params: { id } }) {
      const body = await PostController.getPost(id);
      return { body, status: 200 };
    },
    async createPost({ body: payload }) {
      const body = await PostController.createPost(payload);
      return { body, status: 201 };
    },
  });

  createExpressEndpoints(contract, router, app);

  const port = 5000;
  app.listen(port, function () {
    console.log(`[app] Listening at http://localhost:${port}`);
  });
}
