
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateMedicalRecordStatusInput,
  UserListMedicalRecordStatusInput,
  UserUpdateMedicalRecordStatusInput,
  UserUpdateMedicalRecordStatusesInput,
  ApiMedicalRecordStatusDataAccessUserService,
  MedicalRecordStatus,
} from '@case-clinical/api/medical-record-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiMedicalRecordStatusFeatureUserResolver {
  constructor(private readonly service: ApiMedicalRecordStatusDataAccessUserService) {}

  @Query(() => [MedicalRecordStatus], { nullable: true })
  userMedicalRecordStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.userMedicalRecordStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountMedicalRecordStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.userCountMedicalRecordStatuses(user.id, input)
  }

  @Query(() => [MedicalRecordStatus], { nullable: true })
  userSelectMedicalRecordStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListMedicalRecordStatusInput, nullable: true }) input?: UserListMedicalRecordStatusInput,
  ) {
    return this.service.userSelectMedicalRecordStatuses(user.id, input)
  }







  @Query(() => MedicalRecordStatus, { nullable: true })
  userMedicalRecordStatus(@CtxUser() user: User, @Args('medicalRecordStatusId') medicalRecordStatusId: string) {
    return this.service.userMedicalRecordStatus(user.id, medicalRecordStatusId)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  userCreateMedicalRecordStatus(@CtxUser() user: User, @Args('input') input: UserCreateMedicalRecordStatusInput,) {
    return this.service.userCreateMedicalRecordStatus(user.id, input)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  userUpdateMedicalRecordStatus(
    @CtxUser() user: User,
    @Args('medicalRecordStatusId') medicalRecordStatusId: string,
    @Args('input') input: UserUpdateMedicalRecordStatusInput,
  ) {
    return this.service.userUpdateMedicalRecordStatus(user.id, medicalRecordStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateMedicalRecordStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateMedicalRecordStatusesInput,
  ) {
    return this.service.userUpdateMedicalRecordStatuses(user.id, input)
  }

  @Mutation(() => MedicalRecordStatus, { nullable: true })
  userDeleteMedicalRecordStatus(@CtxUser() user: User, @Args('medicalRecordStatusId') medicalRecordStatusId: string) {
    return this.service.userDeleteMedicalRecordStatus(user.id, medicalRecordStatusId)
  }
}

