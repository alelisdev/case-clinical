
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateIntegrationInput,
  UserListIntegrationInput,
  UserUpdateIntegrationInput,
  UserUpdateIntegrationsInput,
  ApiIntegrationDataAccessUserService,
  Integration,
} from '@case-clinical/api/integration/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiIntegrationFeatureUserResolver {
  constructor(private readonly service: ApiIntegrationDataAccessUserService) {}

  @Query(() => [Integration], { nullable: true })
  userIntegrations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.userIntegrations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountIntegrations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.userCountIntegrations(user.id, input)
  }

  @Query(() => [Integration], { nullable: true })
  userSelectIntegrations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.userSelectIntegrations(user.id, input)
  }







  @Query(() => Integration, { nullable: true })
  userIntegration(@CtxUser() user: User, @Args('integrationId') integrationId: string) {
    return this.service.userIntegration(user.id, integrationId)
  }

  @Mutation(() => Integration, { nullable: true })
  userCreateIntegration(@CtxUser() user: User, @Args('input') input: UserCreateIntegrationInput,) {
    return this.service.userCreateIntegration(user.id, input)
  }

  @Mutation(() => Integration, { nullable: true })
  userUpdateIntegration(
    @CtxUser() user: User,
    @Args('integrationId') integrationId: string,
    @Args('input') input: UserUpdateIntegrationInput,
  ) {
    return this.service.userUpdateIntegration(user.id, integrationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateIntegrations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateIntegrationsInput,
  ) {
    return this.service.userUpdateIntegrations(user.id, input)
  }

  @Mutation(() => Integration, { nullable: true })
  userDeleteIntegration(@CtxUser() user: User, @Args('integrationId') integrationId: string) {
    return this.service.userDeleteIntegration(user.id, integrationId)
  }
}

