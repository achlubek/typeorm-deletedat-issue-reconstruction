import { TypeOrmModule } from "@nestjs/typeorm";

import { appModuleImports } from "@app/appModuleMetadata";
import { getConfig } from "@app/ormconfig";

const testEnvOrmConfig = getConfig("test");

export const testModuleMetadata = {
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forRoot(testEnvOrmConfig), ...appModuleImports],
  exports: [],
};
