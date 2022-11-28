import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

import { config } from "@app/ormconfig";

const ds = new DataSource(config as DataSourceOptions);

// eslint-disable-next-line import/no-default-export
export default ds;
