
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureVendorStatusInput,
  UserListProcedureVendorStatusInput,
  UserUpdateProcedureVendorStatusInput,
  UserUpdateProcedureVendorStatusesInput,
  ApiProcedureVendorStatusDataAccessUserService,
  ProcedureVendorStatus,
} from '@case-clinical/api/procedure-vendor-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureVendorStatusFeatureUserResolver {
  constructor(private readonly service: ApiProcedureVendorStatusDataAccessUserService) {}

  @Query(() => [ProcedureVendorStatus], { nullable: true })
  userProcedureVendorStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.userProcedureVendorStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureVendorStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.userCountProcedureVendorStatuses(user.id, input)
  }

  @Query(() => [ProcedureVendorStatus], { nullable: true })
  userSelectProcedureVendorStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureVendorStatusInput, nullable: true }) input?: UserListProcedureVendorStatusInput,
  ) {
    return this.service.userSelectProcedureVendorStatuses(user.id, input)
  }







  @Query(() => ProcedureVendorStatus, { nullable: true })
  userProcedureVendorStatus(@CtxUser() user: User, @Args('procedureVendorStatusId') procedureVendorStatusId: string) {
    return this.service.userProcedureVendorStatus(user.id, procedureVendorStatusId)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  userCreateProcedureVendorStatus(@CtxUser() user: User, @Args('input') input: UserCreateProcedureVendorStatusInput,) {
    return this.service.userCreateProcedureVendorStatus(user.id, input)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  userUpdateProcedureVendorStatus(
    @CtxUser() user: User,
    @Args('procedureVendorStatusId') procedureVendorStatusId: string,
    @Args('input') input: UserUpdateProcedureVendorStatusInput,
  ) {
    return this.service.userUpdateProcedureVendorStatus(user.id, procedureVendorStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureVendorStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureVendorStatusesInput,
  ) {
    return this.service.userUpdateProcedureVendorStatuses(user.id, input)
  }

  @Mutation(() => ProcedureVendorStatus, { nullable: true })
  userDeleteProcedureVendorStatus(@CtxUser() user: User, @Args('procedureVendorStatusId') procedureVendorStatusId: string) {
    return this.service.userDeleteProcedureVendorStatus(user.id, procedureVendorStatusId)
  }
}

