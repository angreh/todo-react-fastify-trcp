import { knex as queryCaller } from "knex";
import config from "../database/knexfile";
import { publicProcedure, router } from "./trcp";
import { z } from "zod";

const knex = queryCaller(config);

export const apiRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }).nullable()
    )
    .query(({ input }) => {
      return {
        text: `Hello ${input?.name ?? "world"}!`,
      };
    }),
  getAll: publicProcedure.query(async () => ({ todos: await knex("todos") })),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const todo = await knex("todos").where("id", input.id).first();

      return {
        todo,
      };
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await knex("todos").insert({
        title: input.title,
      });

      return {
        success: true,
      };
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await knex("todos").where("id", input.id).update({ title: input.title });

      return {
        success: true,
      };
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await knex("todos").where("id", input.id).delete();
      return {
        success: true,
      };
    }),
});
