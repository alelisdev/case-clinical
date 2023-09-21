
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureOrTreatmentRequestInput,
  UserListProcedureOrTreatmentRequestInput,
  UserUpdateProcedureOrTreatmentRequestInput,
  UserUpdateProcedureOrTreatmentRequestsInput,
  ApiProcedureOrTreatmentRequestDataAccessUserService,
  ProcedureOrTreatmentRequest,
} from '@case-clinical/api/procedure-or-treatment-request/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureOrTreatmentRequestFeatureUserResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDataAccessUserService) {}

  @Query(() => [ProcedureOrTreatmentRequest], { nullable: true })
  userProcedureOrTreatmentRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.userProcedureOrTreatmentRequests(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureOrTreatmentRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.userCountProcedureOrTreatmentRequests(user.id, input)
  }

  @Query(() => [ProcedureOrTreatmentRequest], { nullable: true })
  userSelectProcedureOrTreatmentRequests(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestInput,
  ) {
    return this.service.userSelectProcedureOrTreatmentRequests(user.id, input)
  }







  @Query(() => ProcedureOrTreatmentRequest, { nullable: true })
  userProcedureOrTreatmentRequest(@CtxUser() user: User, @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string) {
    return this.service.userProcedureOrTreatmentRequest(user.id, procedureOrTreatmentRequestId)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  userCreateProcedureOrTreatmentRequest(@CtxUser() user: User, @Args('input') input: UserCreateProcedureOrTreatmentRequestInput,) {
    return this.service.userCreateProcedureOrTreatmentRequest(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  userUpdateProcedureOrTreatmentRequest(
    @CtxUser() user: User,
    @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequest(user.id, procedureOrTreatmentRequestId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureOrTreatmentRequests(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestsInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequests(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequest, { nullable: true })
  userDeleteProcedureOrTreatmentRequest(@CtxUser() user: User, @Args('procedureOrTreatmentRequestId') procedureOrTreatmentRequestId: string) {
    return this.service.userDeleteProcedureOrTreatmentRequest(user.id, procedureOrTreatmentRequestId)
  }
}

