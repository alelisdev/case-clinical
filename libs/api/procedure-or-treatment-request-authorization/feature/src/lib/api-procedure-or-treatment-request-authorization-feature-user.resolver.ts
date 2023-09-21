
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureOrTreatmentRequestAuthorizationInput,
  UserListProcedureOrTreatmentRequestAuthorizationInput,
  UserUpdateProcedureOrTreatmentRequestAuthorizationInput,
  UserUpdateProcedureOrTreatmentRequestAuthorizationsInput,
  ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService,
  ProcedureOrTreatmentRequestAuthorization,
} from '@case-clinical/api/procedure-or-treatment-request-authorization/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'
import { UserListProcedureOrTreatmentRequestInput, ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureOrTreatmentRequestAuthorizationFeatureUserResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService) {}

  @Query(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  userProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.userProcedureOrTreatmentRequestAuthorizations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.userCountProcedureOrTreatmentRequestAuthorizations(user.id, input)
  }

  @Query(() => [ProcedureOrTreatmentRequestAuthorization], { nullable: true })
  userSelectProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestAuthorizationInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.userSelectProcedureOrTreatmentRequestAuthorizations(user.id, input)
  }







  @Query(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  userProcedureOrTreatmentRequestAuthorization(@CtxUser() user: User, @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string) {
    return this.service.userProcedureOrTreatmentRequestAuthorization(user.id, procedureOrTreatmentRequestAuthorizationId)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  userCreateProcedureOrTreatmentRequestAuthorization(@CtxUser() user: User, @Args('input') input: UserCreateProcedureOrTreatmentRequestAuthorizationInput,) {
    return this.service.userCreateProcedureOrTreatmentRequestAuthorization(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  userUpdateProcedureOrTreatmentRequestAuthorization(
    @CtxUser() user: User,
    @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestAuthorizationInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequestAuthorization(user.id, procedureOrTreatmentRequestAuthorizationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureOrTreatmentRequestAuthorizations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestAuthorizationsInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequestAuthorizations(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestAuthorization, { nullable: true })
  userDeleteProcedureOrTreatmentRequestAuthorization(@CtxUser() user: User, @Args('procedureOrTreatmentRequestAuthorizationId') procedureOrTreatmentRequestAuthorizationId: string) {
    return this.service.userDeleteProcedureOrTreatmentRequestAuthorization(user.id, procedureOrTreatmentRequestAuthorizationId)
  }
}

