
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePatientStudyInput,
  AdminListPatientStudyInput,
  AdminUpdatePatientStudyInput,
  ApiPatientStudyDataAccessAdminService,
  PatientStudy
} from '@case-clinical/api/patient-study/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPatientStudyFeatureAdminResolver {
  constructor(private readonly service: ApiPatientStudyDataAccessAdminService) {}

  @Query(() => [PatientStudy], { nullable: true })
  adminPatientStudies(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientStudyInput, nullable: true }) input?: AdminListPatientStudyInput,
  ) {
    return this.service.adminPatientStudies(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPatientStudies(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientStudyInput, nullable: true }) input?: AdminListPatientStudyInput,
  ) {
    return this.service.adminCountPatientStudies(admin.id, input)
  }





  @Query(() => PatientStudy, { nullable: true })
  adminPatientStudy(@CtxUser() admin: User, @Args('patientStudyId') patientStudyId: string) {
    return this.service.adminPatientStudy(admin.id, patientStudyId)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  adminCreatePatientStudy(@CtxUser() admin: User, @Args('input') input: AdminCreatePatientStudyInput,) {
    return this.service.adminCreatePatientStudy(admin.id, input)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  adminUpdatePatientStudy(
    @CtxUser() admin: User,
    @Args('patientStudyId') patientStudyId: string,
    @Args('input') input: AdminUpdatePatientStudyInput,
  ) {
    return this.service.adminUpdatePatientStudy(admin.id, patientStudyId, input)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  adminDeletePatientStudy(@CtxUser() admin: User, @Args('patientStudyId') patientStudyId: string) {
    return this.service.adminDeletePatientStudy(admin.id, patientStudyId)
  }
}

