
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListMedicalRecordStatusInput,
  ApiMedicalRecordStatusDataAccessPublicService,
  MedicalRecordStatus,
} from '@case-clinical/api/medical-record-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiMedicalRecordStatusFeaturePublicResolver {
  constructor(private readonly service: ApiMedicalRecordStatusDataAccessPublicService) {}
           
  @Query(() => [MedicalRecordStatus], { nullable: true })
  publicMedicalRecordStatuses(
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.publicMedicalRecordStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountMedicalRecordStatuses(
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.publicCountMedicalRecordStatuses(input)
  }

  @Query(() => [MedicalRecordStatus], { nullable: true })
  publicSelectMedicalRecordStatuses(
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.publicSelectMedicalRecordStatuses(input)
  }

  @Query(() => MedicalRecordStatus, { nullable: true })
  publicMedicalRecordStatus(@Args('medicalRecordStatusId') medicalRecordStatusId: string) {
    return this.service.publicMedicalRecordStatus(medicalRecordStatusId)
  }
}
