import { DynamicModule, Module, Provider, Type } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RbacGuard } from "./guards/rbac.guard";
import { APP_GUARD } from "@nestjs/core";
import {
  RbacModuleOptions,
  RbacOptionsFactory,
} from "./interfaces/rbac-options.interface";
import { RbacService } from "./rbac.service";
import { HttpModule } from "@nestjs/axios";
import { RBAC_OPTIONS } from "./constants/rbac.constants";

@Module({})
export class RbacModule {
  static register(options: RbacModuleOptions): DynamicModule {
    return {
      module: RbacModule,
      global: options.global,
      imports: options.imports && [HttpModule],
      providers: [
        this.createProviders(options),
        // { provide: "RBAC_OPTIONS", useValue: options },
        RbacService,
        RbacGuard,
      ],
      exports: [RbacService, RbacGuard],
    };
  }

  private static createProviders(options: RbacModuleOptions): Provider {
    if (options.useFactory) {
      return this.createOptionsProvider(options);
    }

    const useClass = options.useClass;

    return {
      provide: RBAC_OPTIONS,
      useClass,
    };
  }

  private static createOptionsProvider(options: RbacModuleOptions): Provider {
    return {
      provide: RBAC_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
