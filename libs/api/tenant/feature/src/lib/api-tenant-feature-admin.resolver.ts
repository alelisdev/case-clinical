import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateTenantInput,
  AdminListTenantInput,
  AdminUpdateTenantInput,
  ApiTenantDataAccessAdminService,
  Tenant
} from '@case-clinical/api/tenant/data-access'
import { User } from '@case-clinical/api/user/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiTenantFeatureAdminResolver {
  constructor(private readonly service: ApiTenantDataAccessAdminService) {}

  @Query(() => [Tenant], { nullable: true })
  adminTenants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTenantInput, nullable: true }) input?: AdminListTenantInput,
  ) {
    return this.service.adminTenants(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountTenants(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListTenantInput, nullable: true }) input?: AdminListTenantInput,
  ) {
    return this.service.adminCountTenants(admin.id, input)
  }

  @Query(() => Tenant, { nullable: true })
  adminTenant(@CtxUser() admin: User, @Args('tenantId') tenantId: string) {
    return this.service.adminTenant(admin.id, tenantId)
  }

  @Mutation(() => Tenant, { nullable: true })
  adminCreateTenant(@CtxUser() admin: User, @Args('input') input: AdminCreateTenantInput,) {
    return this.service.adminCreateTenant(admin.id, input)
  }

  @Mutation(() => Tenant, { nullable: true })
  adminUpdateTenant(
    @CtxUser() admin: User,
    @Args('tenantId') tenantId: string,
    @Args('input') input: AdminUpdateTenantInput,
  ) {
    return this.service.adminUpdateTenant(admin.id, tenantId, input)
  }

  @Mutation(() => Tenant, { nullable: true })
  adminDeleteTenant(@CtxUser() admin: User, @Args('tenantId') tenantId: string) {
    return this.service.adminDeleteTenant(admin.id, tenantId)
  }
}

