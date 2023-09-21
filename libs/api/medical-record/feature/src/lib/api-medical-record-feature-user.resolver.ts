
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMedicalRecordInput,
  UserListMedicalRecordInput,
  UserUpdateMedicalRecordInput,
  UserUpdateMedicalRecordsInput,
  ApiMedicalRecordDataAccessUserService,
  MedicalRecord,
} from '@case-clinical/api/medical-record/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMedicalRecordFeatureUserResolver {
  constructor(private readonly service: ApiMedicalRecordDataAccessUserService) {}

  @Query(() => [MedicalRecord], { nullable: true })
  userMedicalRecords(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.userMedicalRecords(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMedicalRecords(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.userCountMedicalRecords(user.id, input)
  }

  @Query(() => [MedicalRecord], { nullable: true })
  userSelectMedicalRecords(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordInput, nullable: true }) input?: UserListMedicalRecordInput,
  ) {
    return this.service.userSelectMedicalRecords(user.id, input)
  }







  @Query(() => MedicalRecord, { nullable: true })
  userMedicalRecord(@CtxUser() user: User, @Args('medicalRecordId') medicalRecordId: string) {
    return this.service.userMedicalRecord(user.id, medicalRecordId)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  userCreateMedicalRecord(@CtxUser() user: User, @Args('input') input: UserCreateMedicalRecordInput,) {
    return this.service.userCreateMedicalRecord(user.id, input)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  userUpdateMedicalRecord(
    @CtxUser() user: User,
    @Args('medicalRecordId') medicalRecordId: string,
    @Args('input') input: UserUpdateMedicalRecordInput,
  ) {
    return this.service.userUpdateMedicalRecord(user.id, medicalRecordId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateMedicalRecords(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateMedicalRecordsInput,
  ) {
    return this.service.userUpdateMedicalRecords(user.id, input)
  }

  @Mutation(() => MedicalRecord, { nullable: true })
  userDeleteMedicalRecord(@CtxUser() user: User, @Args('medicalRecordId') medicalRecordId: string) {
    return this.service.userDeleteMedicalRecord(user.id, medicalRecordId)
  }
}

