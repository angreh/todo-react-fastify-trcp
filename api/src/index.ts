import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { appRouter } from "./routes/index";
import cors from "@fastify/cors";

const server: FastifyInstance = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "*",
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
  },
});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen({ port: 3030 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;

    console.log(`server listening on http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
