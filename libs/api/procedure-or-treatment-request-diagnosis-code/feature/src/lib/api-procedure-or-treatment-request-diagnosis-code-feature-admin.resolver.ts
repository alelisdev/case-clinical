
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput,
  AdminListProcedureOrTreatmentRequestDiagnosisCodeInput,
  AdminUpdateProcedureOrTreatmentRequestDiagnosisCodeInput,
  ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService,
  ProcedureOrTreatmentRequestDiagnosisCode
} from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListDiagnosisCodeInput, DiagnosisCode } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListProcedureOrTreatmentRequestInput, ProcedureOrTreatmentRequest } from '@case-clinical/api/procedure-or-treatment-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiProcedureOrTreatmentRequestDiagnosisCodeFeatureAdminResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService) {}

  @Query(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  adminProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.adminProcedureOrTreatmentRequestDiagnosisCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountProcedureOrTreatmentRequestDiagnosisCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: AdminListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.adminCountProcedureOrTreatmentRequestDiagnosisCodes(admin.id, input)
  }





  @Query(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  adminProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string) {
    return this.service.adminProcedureOrTreatmentRequestDiagnosisCode(admin.id, procedureOrTreatmentRequestDiagnosisCodeId)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  adminCreateProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() admin: User, @Args('input') input: AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput,) {
    return this.service.adminCreateProcedureOrTreatmentRequestDiagnosisCode(admin.id, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  adminUpdateProcedureOrTreatmentRequestDiagnosisCode(
    @CtxUser() admin: User,
    @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string,
    @Args('input') input: AdminUpdateProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.adminUpdateProcedureOrTreatmentRequestDiagnosisCode(admin.id, procedureOrTreatmentRequestDiagnosisCodeId, input)
  }

  @Mutation(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  adminDeleteProcedureOrTreatmentRequestDiagnosisCode(@CtxUser() admin: User, @Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string) {
    return this.service.adminDeleteProcedureOrTreatmentRequestDiagnosisCode(admin.id, procedureOrTreatmentRequestDiagnosisCodeId)
  }
}

