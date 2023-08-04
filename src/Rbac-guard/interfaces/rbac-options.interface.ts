import { ModuleMetadata, Provider, Type } from "@nestjs/common";

export class RbacOptions {
  url: string;
}

export interface RbacOptionsFactory {
  createRbacOptions(): Promise<RbacModuleOptions> | RbacModuleOptions;
}

export interface RbacModuleOptions extends Pick<ModuleMetadata, "imports"> {
  global?: boolean;
  inject?: any[];
  useClass?: Type<RbacOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<RbacOptions> | RbacOptions;
}
