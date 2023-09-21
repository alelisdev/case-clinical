
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService,
  ProcedureOrTreatmentRequestDiagnosisCode,
} from '@case-clinical/api/procedure-or-treatment-request-diagnosis-code/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiProcedureOrTreatmentRequestDiagnosisCodeFeaturePublicResolver {
  constructor(private readonly service: ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService) {}
           
  @Query(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  publicProcedureOrTreatmentRequestDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.publicProcedureOrTreatmentRequestDiagnosisCodes(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountProcedureOrTreatmentRequestDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.publicCountProcedureOrTreatmentRequestDiagnosisCodes(input)
  }

  @Query(() => [ProcedureOrTreatmentRequestDiagnosisCode], { nullable: true })
  publicSelectProcedureOrTreatmentRequestDiagnosisCodes(
    @Args({ name: 'input', type: () => UserListProcedureOrTreatmentRequestDiagnosisCodeInput, nullable: true }) input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput,
  ) {
    return this.service.publicSelectProcedureOrTreatmentRequestDiagnosisCodes(input)
  }

  @Query(() => ProcedureOrTreatmentRequestDiagnosisCode, { nullable: true })
  publicProcedureOrTreatmentRequestDiagnosisCode(@Args('procedureOrTreatmentRequestDiagnosisCodeId') procedureOrTreatmentRequestDiagnosisCodeId: string) {
    return this.service.publicProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCodeId)
  }
}
