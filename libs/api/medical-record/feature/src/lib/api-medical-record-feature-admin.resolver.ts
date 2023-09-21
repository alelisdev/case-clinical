
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateMedicalRecordInput,
  AdminListMedicalRecordInput,
  AdminUpdateMedicalRecordInput,
  ApiMedicalRecordDataAccessAdminService,
  MedicalRecord
} from '@case-clinical/api/medical-record/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiMedicalRecordFeatureAdminResolver {
  constructor(private readonly service: ApiMedicalRecordDataAccessAdminService) {}

  @Query(() => [MedicalRecord], { nullable: true })
  adminMedicalRecords(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalRecordInput, nullable: true }) input?: AdminListMedicalRecordInput,
  ) {
    return this.service.adminMedicalRecords(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountMedicalRecords(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListMedicalRecordInput, nullable: true }) input?: AdminListMedicalRecordInput,
  ) {
    return this.service.adminCountMedicalRecords(admin.id, input)
  }





  @Query(() => MedicalRecord, { nullable: true })
  adminMedicalRecord(@CtxUser() admin: User, @Args('medicalRecordId') medicalRecordId: string) {
    return this.service.adminMedicalRecord(admin.id, medicalRecordId)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  adminCreateMedicalRecord(@CtxUser() admin: User, @Args('input') input: AdminCreateMedicalRecordInput,) {
    return this.service.adminCreateMedicalRecord(admin.id, input)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  adminUpdateMedicalRecord(
    @CtxUser() admin: User,
    @Args('medicalRecordId') medicalRecordId: string,
    @Args('input') input: AdminUpdateMedicalRecordInput,
  ) {
    return this.service.adminUpdateMedicalRecord(admin.id, medicalRecordId, input)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  adminDeleteMedicalRecord(@CtxUser() admin: User, @Args('medicalRecordId') medicalRecordId: string) {
    return this.service.adminDeleteMedicalRecord(admin.id, medicalRecordId)
  }
}

