
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListMedicalRecordInput,
  ApiMedicalRecordDataAccessPublicService,
  MedicalRecord,
} from '@case-clinical/api/medical-record/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiMedicalRecordFeaturePublicResolver {
  constructor(private readonly service: ApiMedicalRecordDataAccessPublicService) {}
           
  @Query(() => [MedicalRecord], { nullable: true })
  publicMedicalRecords(
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.publicMedicalRecords(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountMedicalRecords(
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.publicCountMedicalRecords(input)
  }

  @Query(() => [MedicalRecord], { nullable: true })
  publicSelectMedicalRecords(
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.publicSelectMedicalRecords(input)
  }

  @Query(() => MedicalRecord, { nullable: true })
  publicMedicalRecord(@Args('medicalRecordId') medicalRecordId: string) {
    return this.service.publicMedicalRecord(medicalRecordId)
  }
}
