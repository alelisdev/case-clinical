
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthorizationDiagnosisCodeInput,
  UserListPriorAuthorizationDiagnosisCodeInput,
  UserUpdatePriorAuthorizationDiagnosisCodeInput,
  UserUpdatePriorAuthorizationDiagnosisCodesInput,
  ApiPriorAuthorizationDiagnosisCodeDataAccessUserService,
  PriorAuthorizationDiagnosisCode,
} from '@case-clinical/api/prior-authorization-diagnosis-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthorizationDiagnosisCodeFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthorizationDiagnosisCodeDataAccessUserService) {}

  @Query(() => [PriorAuthorizationDiagnosisCode], { nullable: true })
  userPriorAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userPriorAuthorizationDiagnosisCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userCountPriorAuthorizationDiagnosisCodes(user.id, input)
  }

  @Query(() => [PriorAuthorizationDiagnosisCode], { nullable: true })
  userSelectPriorAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListPriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userSelectPriorAuthorizationDiagnosisCodes(user.id, input)
  }







  @Query(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  userPriorAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string) {
    return this.service.userPriorAuthorizationDiagnosisCode(user.id, priorAuthorizationDiagnosisCodeId)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  userCreatePriorAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthorizationDiagnosisCodeInput,) {
    return this.service.userCreatePriorAuthorizationDiagnosisCode(user.id, input)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  userUpdatePriorAuthorizationDiagnosisCode(
    @CtxUser() user: User,
    @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string,
    @Args('input') input: UserUpdatePriorAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userUpdatePriorAuthorizationDiagnosisCode(user.id, priorAuthorizationDiagnosisCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthorizationDiagnosisCodesInput,
  ) {
    return this.service.userUpdatePriorAuthorizationDiagnosisCodes(user.id, input)
  }

  @Mutation(() => PriorAuthorizationDiagnosisCode, { nullable: true })
  userDeletePriorAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('priorAuthorizationDiagnosisCodeId') priorAuthorizationDiagnosisCodeId: string) {
    return this.service.userDeletePriorAuthorizationDiagnosisCode(user.id, priorAuthorizationDiagnosisCodeId)
  }
}

