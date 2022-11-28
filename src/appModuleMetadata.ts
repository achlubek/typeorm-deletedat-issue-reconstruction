import { TypeOrmModule } from "@nestjs/typeorm";

import { default as Entities } from "@app/db/entity";

export const appModuleImports = [TypeOrmModule.forFeature([...Entities])];
