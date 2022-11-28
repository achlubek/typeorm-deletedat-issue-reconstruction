import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TestingModule } from "@nestjs/testing/testing-module";
import * as express from "express";

export const initTestApp = async (
  module: TestingModule
): Promise<INestApplication> => {
  const app = module.createNestApplication();
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: "exposeAll",
    })
  );
  app.use(express.json({ limit: 1048576 })); // 1024 * 1024
  app.useLogger(["error", "warn", "log", "debug", "verbose"]);
  await app.init();
  return app;
};
