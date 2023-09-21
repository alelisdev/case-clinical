
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPatientTreatmentStatusInput,
  ApiPatientTreatmentStatusDataAccessPublicService,
  PatientTreatmentStatus,
} from '@case-clinical/api/patient-treatment-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPatientTreatmentStatusFeaturePublicResolver {
  constructor(private readonly service: ApiPatientTreatmentStatusDataAccessPublicService) {}
           
  @Query(() => [PatientTreatmentStatus], { nullable: true })
  publicPatientTreatmentStatuses(
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.publicPatientTreatmentStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPatientTreatmentStatuses(
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.publicCountPatientTreatmentStatuses(input)
  }

  @Query(() => [PatientTreatmentStatus], { nullable: true })
  publicSelectPatientTreatmentStatuses(
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.publicSelectPatientTreatmentStatuses(input)
  }

  @Query(() => PatientTreatmentStatus, { nullable: true })
  publicPatientTreatmentStatus(@Args('patientTreatmentStatusId') patientTreatmentStatusId: string) {
    return this.service.publicPatientTreatmentStatus(patientTreatmentStatusId)
  }
}
