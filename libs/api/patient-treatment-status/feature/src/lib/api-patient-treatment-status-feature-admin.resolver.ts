
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePatientTreatmentStatusInput,
  AdminListPatientTreatmentStatusInput,
  AdminUpdatePatientTreatmentStatusInput,
  ApiPatientTreatmentStatusDataAccessAdminService,
  PatientTreatmentStatus
} from '@case-clinical/api/patient-treatment-status/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPatientTreatmentStatusFeatureAdminResolver {
  constructor(private readonly service: ApiPatientTreatmentStatusDataAccessAdminService) {}

  @Query(() => [PatientTreatmentStatus], { nullable: true })
  adminPatientTreatmentStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientTreatmentStatusInput, nullable: true }) input?: AdminListPatientTreatmentStatusInput,
  ) {
    return this.service.adminPatientTreatmentStatuses(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPatientTreatmentStatuses(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPatientTreatmentStatusInput, nullable: true }) input?: AdminListPatientTreatmentStatusInput,
  ) {
    return this.service.adminCountPatientTreatmentStatuses(admin.id, input)
  }





  @Query(() => PatientTreatmentStatus, { nullable: true })
  adminPatientTreatmentStatus(@CtxUser() admin: User, @Args('patientTreatmentStatusId') patientTreatmentStatusId: string) {
    return this.service.adminPatientTreatmentStatus(admin.id, patientTreatmentStatusId)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  adminCreatePatientTreatmentStatus(@CtxUser() admin: User, @Args('input') input: AdminCreatePatientTreatmentStatusInput,) {
    return this.service.adminCreatePatientTreatmentStatus(admin.id, input)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  adminUpdatePatientTreatmentStatus(
    @CtxUser() admin: User,
    @Args('patientTreatmentStatusId') patientTreatmentStatusId: string,
    @Args('input') input: AdminUpdatePatientTreatmentStatusInput,
  ) {
    return this.service.adminUpdatePatientTreatmentStatus(admin.id, patientTreatmentStatusId, input)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  adminDeletePatientTreatmentStatus(@CtxUser() admin: User, @Args('patientTreatmentStatusId') patientTreatmentStatusId: string) {
    return this.service.adminDeletePatientTreatmentStatus(admin.id, patientTreatmentStatusId)
  }
}

