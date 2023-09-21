
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateOrganizationInput,
  UserListOrganizationInput,
  UserUpdateOrganizationInput,
  UserUpdateOrganizationsInput,
  ApiOrganizationDataAccessUserService,
  Organization,
} from '@case-clinical/api/organization/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiOrganizationFeatureUserResolver {
  constructor(private readonly service: ApiOrganizationDataAccessUserService) {}

  @Query(() => [Organization], { nullable: true })
  userOrganizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.userOrganizations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountOrganizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.userCountOrganizations(user.id, input)
  }

  @Query(() => [Organization], { nullable: true })
  userSelectOrganizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.userSelectOrganizations(user.id, input)
  }







  @Query(() => Organization, { nullable: true })
  userOrganization(@CtxUser() user: User, @Args('organizationId') organizationId: string) {
    return this.service.userOrganization(user.id, organizationId)
  }

  @Mutation(() => Organization, { nullable: true })
  userCreateOrganization(@CtxUser() user: User, @Args('input') input: UserCreateOrganizationInput,) {
    return this.service.userCreateOrganization(user.id, input)
  }

  @Mutation(() => Organization, { nullable: true })
  userUpdateOrganization(
    @CtxUser() user: User,
    @Args('organizationId') organizationId: string,
    @Args('input') input: UserUpdateOrganizationInput,
  ) {
    return this.service.userUpdateOrganization(user.id, organizationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateOrganizations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateOrganizationsInput,
  ) {
    return this.service.userUpdateOrganizations(user.id, input)
  }

  @Mutation(() => Organization, { nullable: true })
  userDeleteOrganization(@CtxUser() user: User, @Args('organizationId') organizationId: string) {
    return this.service.userDeleteOrganization(user.id, organizationId)
  }
}

