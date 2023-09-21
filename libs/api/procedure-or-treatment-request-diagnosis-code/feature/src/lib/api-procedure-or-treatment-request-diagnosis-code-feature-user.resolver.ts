
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput,
  UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput,
  UserUpdateProcedureOrTreatmentRequestDiagnosisCodesInput,
  ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService,
  ProcedureOrTreatmentRequestDiagnosisCode,
} from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListProcedureOrTreatmentRequestInput, ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureUserResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService) {}

  @Query(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  userProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.userProcedureOrTreatmentRequestDiagnosisCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.userCountProcedureOrTreatmentRequestDiagnosisCodes(user.id, input)
  }

  @Query(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  userSelectProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.userSelectProcedureOrTreatmentRequestDiagnosisCodes(user.id, input)
  }







  @Query(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  userProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() user: User, @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string) {
    return this.service.userProcedureOrTreatmentRequestDiagnosisCode(user.id, procedureOrTreatmentRequestDiagnosisCodeId)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  userCreateProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() user: User, @Args('input') input: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput,) {
    return this.service.userCreateProcedureOrTreatmentRequestDiagnosisCode(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  userUpdateProcedureOrTreatmentRequestDiagnosisCode(
    @CtxUser() user: User,
    @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequestDiagnosisCode(user.id, procedureOrTreatmentRequestDiagnosisCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodesInput,
  ) {
    return this.service.userUpdateProcedureOrTreatmentRequestDiagnosisCodes(user.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  userDeleteProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() user: User, @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string) {
    return this.service.userDeleteProcedureOrTreatmentRequestDiagnosisCode(user.id, procedureOrTreatmentRequestDiagnosisCodeId)
  }
}

