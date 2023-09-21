
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAuthorizationDiagnosisCodeInput,
  UserListAuthorizationDiagnosisCodeInput,
  UserUpdateAuthorizationDiagnosisCodeInput,
  UserUpdateAuthorizationDiagnosisCodesInput,
  ApiAuthorizationDiagnosisCodeDataAccessUserService,
  AuthorizationDiagnosisCode,
} from '@case-clinical/api/authorization-diagnosis-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListAuthorizationInput, Authorization } from '@case-clinical/api/authorization/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAuthorizationDiagnosisCodeFeatureUserResolver {
  constructor(private readonly service: ApiAuthorizationDiagnosisCodeDataAccessUserService) {}

  @Query(() => [AuthorizationDiagnosisCode], { nullable: true })
  userAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userAuthorizationDiagnosisCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userCountAuthorizationDiagnosisCodes(user.id, input)
  }

  @Query(() => [AuthorizationDiagnosisCode], { nullable: true })
  userSelectAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAuthorizationDiagnosisCodeInput, nullable: true }) input?: UserListAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userSelectAuthorizationDiagnosisCodes(user.id, input)
  }







  @Query(() => AuthorizationDiagnosisCode, { nullable: true })
  userAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string) {
    return this.service.userAuthorizationDiagnosisCode(user.id, authorizationDiagnosisCodeId)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  userCreateAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('input') input: UserCreateAuthorizationDiagnosisCodeInput,) {
    return this.service.userCreateAuthorizationDiagnosisCode(user.id, input)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  userUpdateAuthorizationDiagnosisCode(
    @CtxUser() user: User,
    @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string,
    @Args('input') input: UserUpdateAuthorizationDiagnosisCodeInput,
  ) {
    return this.service.userUpdateAuthorizationDiagnosisCode(user.id, authorizationDiagnosisCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAuthorizationDiagnosisCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAuthorizationDiagnosisCodesInput,
  ) {
    return this.service.userUpdateAuthorizationDiagnosisCodes(user.id, input)
  }

  @Mutation(() => AuthorizationDiagnosisCode, { nullable: true })
  userDeleteAuthorizationDiagnosisCode(@CtxUser() user: User, @Args('authorizationDiagnosisCodeId') authorizationDiagnosisCodeId: string) {
    return this.service.userDeleteAuthorizationDiagnosisCode(user.id, authorizationDiagnosisCodeId)
  }
}

