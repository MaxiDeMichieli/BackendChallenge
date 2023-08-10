import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';

export const RolesGuard = (routeRoles: string[]): Type<CanActivate> => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const userRole = context.getArgs()[0].user.role;

      return routeRoles.includes(userRole);
    }
  }

  const guard = mixin(RolesGuardMixin);
  return guard;
};
