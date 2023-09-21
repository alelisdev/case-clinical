
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLegalCaseInput,
  UserListLegalCaseInput,
  UserUpdateLegalCaseInput,
  UserUpdateLegalCasesInput,
  ApiLegalCaseDataAccessUserService,
  LegalCase,
} from '@case-clinical/api/legal-case/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListAccidentTypeInput, AccidentType } from '@case-clinical/api/accident-type/data-access'
import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListMedLevelInput, MedLevel } from '@case-clinical/api/med-level/data-access'
import { UserListFirmInput, Firm } from '@case-clinical/api/firm/data-access'
import { UserListAttorneyInput, Attorney } from '@case-clinical/api/attorney/data-access'
import { UserListCaseStatusInput, CaseStatus } from '@case-clinical/api/case-status/data-access'
import { UserListCaseTypeInput, CaseType } from '@case-clinical/api/case-type/data-access'
import { UserListPatientTreatmentStatusInput, PatientTreatmentStatus } from '@case-clinical/api/patient-treatment-status/data-access'
import { UserListCaseProgressStatusInput, CaseProgressStatus } from '@case-clinical/api/case-progress-status/data-access'
import { UserListAdverseInsuranceStatusInput, AdverseInsuranceStatus } from '@case-clinical/api/adverse-insurance-status/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLegalCaseFeatureUserResolver {
  constructor(private readonly service: ApiLegalCaseDataAccessUserService) {}

  @Query(() => [LegalCase], { nullable: true })
  userLegalCaseUpdates(
    @CtxUser() user: User,
  ) {
    return this.service.userLegalCaseUpdates(user.id)
  }

  @Query(() => [LegalCase], { nullable: true })
  userLegalCases(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.userLegalCases(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLegalCases(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.userCountLegalCases(user.id, input)
  }

  @Query(() => [LegalCase], { nullable: true })
  userSelectLegalCases(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLegalCaseInput, nullable: true }) input?: UserListLegalCaseInput,
  ) {
    return this.service.userSelectLegalCases(user.id, input)
  }







  @Query(() => LegalCase, { nullable: true })
  userLegalCase(@CtxUser() user: User, @Args('legalCaseId') legalCaseId: string) {
    return this.service.userLegalCase(user.id, legalCaseId)
  }

  @Mutation(() => LegalCase, { nullable: true })
  userCreateLegalCase(@CtxUser() user: User, @Args('input') input: UserCreateLegalCaseInput,) {
    return this.service.userCreateLegalCase(user.id, input)
  }

  @Mutation(() => LegalCase, { nullable: true })
  userUpdateLegalCase(
    @CtxUser() user: User,
    @Args('legalCaseId') legalCaseId: string,
    @Args('input') input: UserUpdateLegalCaseInput,
  ) {
    return this.service.userUpdateLegalCase(user.id, legalCaseId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLegalCases(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLegalCasesInput,
  ) {
    return this.service.userUpdateLegalCases(user.id, input)
  }

  @Mutation(() => LegalCase, { nullable: true })
  userDeleteLegalCase(@CtxUser() user: User, @Args('legalCaseId') legalCaseId: string) {
    return this.service.userDeleteLegalCase(user.id, legalCaseId)
  }
}

