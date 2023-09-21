
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPatientStudyInput,
  ApiPatientStudyDataAccessPublicService,
  PatientStudy,
} from '@case-clinical/api/patient-study/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPatientStudyFeaturePublicResolver {
  constructor(private readonly service: ApiPatientStudyDataAccessPublicService) {}
           
  @Query(() => [PatientStudy], { nullable: true })
  publicPatientStudies(
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.publicPatientStudies(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPatientStudies(
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.publicCountPatientStudies(input)
  }

  @Query(() => [PatientStudy], { nullable: true })
  publicSelectPatientStudies(
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.publicSelectPatientStudies(input)
  }

  @Query(() => PatientStudy, { nullable: true })
  publicPatientStudy(@Args('patientStudyId') patientStudyId: string) {
    return this.service.publicPatientStudy(patientStudyId)
  }
}
