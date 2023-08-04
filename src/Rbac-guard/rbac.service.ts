import { Header, Inject, Injectable } from "@nestjs/common";

import { HttpService } from "@nestjs/axios";
import { RbacOptions } from "./interfaces/rbac-options.interface";

@Injectable()
export class RbacService {
  constructor(
    @Inject("RBAC_OPTIONS") private readonly rbacOptions: RbacOptions,
    private httpService: HttpService
  ) {}

  async permission(token: string) {
    const url = this.rbacOptions.url;
    const response = await this.httpService.axiosRef.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  }
}
