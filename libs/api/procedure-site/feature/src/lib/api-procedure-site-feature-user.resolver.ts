
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureSiteInput,
  UserListProcedureSiteInput,
  UserUpdateProcedureSiteInput,
  UserUpdateProcedureSitesInput,
  ApiProcedureSiteDataAccessUserService,
  ProcedureSite,
} from '@case-clinical/api/procedure-site/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureSiteFeatureUserResolver {
  constructor(private readonly service: ApiProcedureSiteDataAccessUserService) {}

  @Query(() => [ProcedureSite], { nullable: true })
  userProcedureSites(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.userProcedureSites(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureSites(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.userCountProcedureSites(user.id, input)
  }

  @Query(() => [ProcedureSite], { nullable: true })
  userSelectProcedureSites(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureSiteInput, nullable: true }) input?: UserListProcedureSiteInput,
  ) {
    return this.service.userSelectProcedureSites(user.id, input)
  }







  @Query(() => ProcedureSite, { nullable: true })
  userProcedureSite(@CtxUser() user: User, @Args('procedureSiteId') procedureSiteId: string) {
    return this.service.userProcedureSite(user.id, procedureSiteId)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  userCreateProcedureSite(@CtxUser() user: User, @Args('input') input: UserCreateProcedureSiteInput,) {
    return this.service.userCreateProcedureSite(user.id, input)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  userUpdateProcedureSite(
    @CtxUser() user: User,
    @Args('procedureSiteId') procedureSiteId: string,
    @Args('input') input: UserUpdateProcedureSiteInput,
  ) {
    return this.service.userUpdateProcedureSite(user.id, procedureSiteId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureSites(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureSitesInput,
  ) {
    return this.service.userUpdateProcedureSites(user.id, input)
  }

  @Mutation(() => ProcedureSite, { nullable: true })
  userDeleteProcedureSite(@CtxUser() user: User, @Args('procedureSiteId') procedureSiteId: string) {
    return this.service.userDeleteProcedureSite(user.id, procedureSiteId)
  }
}

