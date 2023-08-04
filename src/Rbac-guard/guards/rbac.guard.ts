import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RbacService } from "../rbac.service";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private rbacService: RbacService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    //check token if type not have and is not Bearer
    if (!token) {
      return false;
    }
    //call rbac_service
    const res = await this.rbacService.permission(token);
    //attach permission to request
    request.payload = res;

    return res.permission;
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
