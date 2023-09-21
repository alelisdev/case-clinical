
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureStatusInput,
  UserListProcedureStatusInput,
  UserUpdateProcedureStatusInput,
  UserUpdateProcedureStatusesInput,
  ApiProcedureStatusDataAccessUserService,
  ProcedureStatus,
} from '@case-clinical/api/procedure-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureStatusFeatureUserResolver {
  constructor(private readonly service: ApiProcedureStatusDataAccessUserService) {}

  @Query(() => [ProcedureStatus], { nullable: true })
  userProcedureStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.userProcedureStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.userCountProcedureStatuses(user.id, input)
  }

  @Query(() => [ProcedureStatus], { nullable: true })
  userSelectProcedureStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureStatusInput, nullable: true }) input?: UserListProcedureStatusInput,
  ) {
    return this.service.userSelectProcedureStatuses(user.id, input)
  }







  @Query(() => ProcedureStatus, { nullable: true })
  userProcedureStatus(@CtxUser() user: User, @Args('procedureStatusId') procedureStatusId: string) {
    return this.service.userProcedureStatus(user.id, procedureStatusId)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  userCreateProcedureStatus(@CtxUser() user: User, @Args('input') input: UserCreateProcedureStatusInput,) {
    return this.service.userCreateProcedureStatus(user.id, input)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  userUpdateProcedureStatus(
    @CtxUser() user: User,
    @Args('procedureStatusId') procedureStatusId: string,
    @Args('input') input: UserUpdateProcedureStatusInput,
  ) {
    return this.service.userUpdateProcedureStatus(user.id, procedureStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureStatusesInput,
  ) {
    return this.service.userUpdateProcedureStatuses(user.id, input)
  }

  @Mutation(() => ProcedureStatus, { nullable: true })
  userDeleteProcedureStatus(@CtxUser() user: User, @Args('procedureStatusId') procedureStatusId: string) {
    return this.service.userDeleteProcedureStatus(user.id, procedureStatusId)
  }
}

