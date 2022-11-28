import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { appModuleImports } from "@app/appModuleMetadata";
import { config } from "@app/ormconfig";

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forRoot(config), ...appModuleImports],
  exports: [],
})
export class AppModule implements NestModule {
  configure(_consumer: MiddlewareConsumer): void {
    //
  }
}
