
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateDiagnosisCodeInput,
  UserListDiagnosisCodeInput,
  UserUpdateDiagnosisCodeInput,
  UserUpdateDiagnosisCodesInput,
  ApiDiagnosisCodeDataAccessUserService,
  DiagnosisCode,
} from '@case-clinical/api/diagnosis-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiDiagnosisCodeFeatureUserResolver {
  constructor(private readonly service: ApiDiagnosisCodeDataAccessUserService) {}

  @Query(() => [DiagnosisCode], { nullable: true })
  userDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.userDiagnosisCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.userCountDiagnosisCodes(user.id, input)
  }

  @Query(() => [DiagnosisCode], { nullable: true })
  userSelectDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDiagnosisCodeInput, nullable: true }) input?: UserListDiagnosisCodeInput,
  ) {
    return this.service.userSelectDiagnosisCodes(user.id, input)
  }







  @Query(() => DiagnosisCode, { nullable: true })
  userDiagnosisCode(@CtxUser() user: User, @Args('diagnosisCodeId') diagnosisCodeId: string) {
    return this.service.userDiagnosisCode(user.id, diagnosisCodeId)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  userCreateDiagnosisCode(@CtxUser() user: User, @Args('input') input: UserCreateDiagnosisCodeInput,) {
    return this.service.userCreateDiagnosisCode(user.id, input)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  userUpdateDiagnosisCode(
    @CtxUser() user: User,
    @Args('diagnosisCodeId') diagnosisCodeId: string,
    @Args('input') input: UserUpdateDiagnosisCodeInput,
  ) {
    return this.service.userUpdateDiagnosisCode(user.id, diagnosisCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateDiagnosisCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateDiagnosisCodesInput,
  ) {
    return this.service.userUpdateDiagnosisCodes(user.id, input)
  }

  @Mutation(() => DiagnosisCode, { nullable: true })
  userDeleteDiagnosisCode(@CtxUser() user: User, @Args('diagnosisCodeId') diagnosisCodeId: string) {
    return this.service.userDeleteDiagnosisCode(user.id, diagnosisCodeId)
  }
}

