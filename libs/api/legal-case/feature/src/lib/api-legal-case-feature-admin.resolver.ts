
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLegalCaseInput,
  AdminListLegalCaseInput,
  AdminUpdateLegalCaseInput,
  ApiLegalCaseDataAccessAdminService,
  LegalCase
} from '@case-clinical/api/legal-case/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListMedLevelInput, MedLevel } from '@case-clinical/api/med-level/data-access'
import { AdminListFirmInput, Firm } from '@case-clinical/api/firm/data-access'
import { AdminListAttorneyInput, Attorney } from '@case-clinical/api/attorney/data-access'
import { AdminListCaseStatusInput, CaseStatus } from '@case-clinical/api/case-status/data-access'
import { AdminListCaseTypeInput, CaseType } from '@case-clinical/api/case-type/data-access'
import { AdminListPatientTreatmentStatusInput, PatientTreatmentStatus } from '@case-clinical/api/patient-treatment-status/data-access'
import { AdminListCaseProgressStatusInput, CaseProgressStatus } from '@case-clinical/api/case-progress-status/data-access'
import { AdminListAdverseInsuranceStatusInput, AdverseInsuranceStatus } from '@case-clinical/api/adverse-insurance-status/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLegalCaseFeatureAdminResolver {
  constructor(private readonly service: ApiLegalCaseDataAccessAdminService) {}

  @Query(() => [LegalCase], { nullable: true })
  adminLegalCases(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLegalCaseInput, nullable: true }) input?: AdminListLegalCaseInput,
  ) {
    return this.service.adminLegalCases(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLegalCases(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLegalCaseInput, nullable: true }) input?: AdminListLegalCaseInput,
  ) {
    return this.service.adminCountLegalCases(admin.id, input)
  }





  @Query(() => LegalCase, { nullable: true })
  adminLegalCase(@CtxUser() admin: User, @Args('legalCaseId') legalCaseId: string) {
    return this.service.adminLegalCase(admin.id, legalCaseId)
  }

  @Mutation(() => LegalCase, { nullable: true })
  adminCreateLegalCase(@CtxUser() admin: User, @Args('input') input: AdminCreateLegalCaseInput,) {
    return this.service.adminCreateLegalCase(admin.id, input)
  }

  @Mutation(() => LegalCase, { nullable: true })
  adminUpdateLegalCase(
    @CtxUser() admin: User,
    @Args('legalCaseId') legalCaseId: string,
    @Args('input') input: AdminUpdateLegalCaseInput,
  ) {
    return this.service.adminUpdateLegalCase(admin.id, legalCaseId, input)
  }

  @Mutation(() => LegalCase, { nullable: true })
  adminDeleteLegalCase(@CtxUser() admin: User, @Args('legalCaseId') legalCaseId: string) {
    return this.service.adminDeleteLegalCase(admin.id, legalCaseId)
  }
}

