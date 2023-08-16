import { Header, Inject, Injectable } from "@nestjs/common";

import { HttpService } from "@nestjs/axios";
import { RbacOptions } from "./interfaces/rbac-options.interface";
import { IpermissionOptions } from "./interfaces/permission-options.interface";

@Injectable()
export class RbacService {
  constructor(
    @Inject("RBAC_OPTIONS") private readonly rbacOptions: RbacOptions,
    private httpService: HttpService
  ) {}

  async permission(token: string, options: IpermissionOptions) {
    const url = this.rbacOptions.url;
    const response = await this.httpService.axiosRef.post(
      url,
      {
        options: options,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  }
}
