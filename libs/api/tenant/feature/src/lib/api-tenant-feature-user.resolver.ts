
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ApiTenantDataAccessUserService,
  Tenant,
  UpdateTenantsResult,
  UserCreateTenantInput,
  UserListTenantInput,
  UserUpdateTenantInput,
  UserUpdateTenantsInput,
} from '@case-clinical/api/tenant/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiTenantFeatureUserResolver {
  constructor(private readonly service: ApiTenantDataAccessUserService) { }

  @Mutation(() => UpdateTenantsResult, {nullable: true})
  userUpdateTenants(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateTenantsInput
  ) {
    return this.service.userUpdateTenants(user.id, input)
  }

  @Query(() => [Tenant], { nullable: true })
  userTenants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTenantInput, nullable: true }) input?: UserListTenantInput,
  ) {
    return this.service.userTenants(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountTenants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTenantInput, nullable: true }) input?: UserListTenantInput,
  ) {
    return this.service.userCountTenants(user.id, input)
  }

  @Query(() => [Tenant], { nullable: true })
  userSelectTenants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListTenantInput, nullable: true }) input?: UserListTenantInput,
  ) {
    return this.service.userSelectTenants(user.id, input)
  }

  @Query(() => Tenant, { nullable: true })
  userTenant(@CtxUser() user: User, @Args('tenantId') tenantId: string) {
    return this.service.userTenant(user.id, tenantId)
  }

  @Mutation(() => Tenant, { nullable: true })
  userCreateTenant(@CtxUser() user: User, @Args('input') input: UserCreateTenantInput,) {
    return this.service.userCreateTenant(user.id, input)
  }

  @Mutation(() => Tenant, { nullable: true })
  userUpdateTenant(
    @CtxUser() user: User,
    @Args('tenantId') tenantId: string,
    @Args('input') input: UserUpdateTenantInput,
  ) {
    return this.service.userUpdateTenant(user.id, tenantId, input)
  }

  @Mutation(() => Tenant, { nullable: true })
  userDeleteTenant(@CtxUser() user: User, @Args('tenantId') tenantId: string) {
    return this.service.userDeleteTenant(user.id, tenantId)
  }
}

