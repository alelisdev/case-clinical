
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPatientInput,
  ApiPatientDataAccessPublicService,
  Patient,
} from '@case-clinical/api/patient/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPatientFeaturePublicResolver {
  constructor(private readonly service: ApiPatientDataAccessPublicService) {}
           
  @Query(() => [Patient], { nullable: true })
  publicPatients(
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.publicPatients(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPatients(
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.publicCountPatients(input)
  }

  @Query(() => [Patient], { nullable: true })
  publicSelectPatients(
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.publicSelectPatients(input)
  }

  @Query(() => Patient, { nullable: true })
  publicPatient(@Args('patientId') patientId: string) {
    return this.service.publicPatient(patientId)
  }
}
