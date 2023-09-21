
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePatientInput,
  AdminListPatientInput,
  AdminUpdatePatientInput,
  ApiPatientDataAccessAdminService,
  Patient
} from '@case-clinical/api/patient/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListEthnicityInput, Ethnicity } from '@case-clinical/api/ethnicity/data-access'
import { AdminListGenderInput, Gender } from '@case-clinical/api/gender/data-access'
import { AdminListLanguageInput, Language } from '@case-clinical/api/language/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPatientFeatureAdminResolver {
  constructor(private readonly service: ApiPatientDataAccessAdminService) {}

  @Query(() => [Patient], { nullable: true })
  adminPatients(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientInput, nullable: true }) input?: AdminListPatientInput,
  ) {
    return this.service.adminPatients(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPatients(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientInput, nullable: true }) input?: AdminListPatientInput,
  ) {
    return this.service.adminCountPatients(admin.id, input)
  }





  @Query(() => Patient, { nullable: true })
  adminPatient(@CtxUser() admin: User, @Args('patientId') patientId: string) {
    return this.service.adminPatient(admin.id, patientId)
  }

  @Mutation(() => Patient, { nullable: true })
  adminCreatePatient(@CtxUser() admin: User, @Args('input') input: AdminCreatePatientInput,) {
    return this.service.adminCreatePatient(admin.id, input)
  }

  @Mutation(() => Patient, { nullable: true })
  adminUpdatePatient(
    @CtxUser() admin: User,
    @Args('patientId') patientId: string,
    @Args('input') input: AdminUpdatePatientInput,
  ) {
    return this.service.adminUpdatePatient(admin.id, patientId, input)
  }

  @Mutation(() => Patient, { nullable: true })
  adminDeletePatient(@CtxUser() admin: User, @Args('patientId') patientId: string) {
    return this.service.adminDeletePatient(admin.id, patientId)
  }
}

