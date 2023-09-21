
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePatientTreatmentStatusInput,
  UserListPatientTreatmentStatusInput,
  UserUpdatePatientTreatmentStatusInput,
  UserUpdatePatientTreatmentStatusesInput,
  ApiPatientTreatmentStatusDataAccessUserService,
  PatientTreatmentStatus,
} from '@case-clinical/api/patient-treatment-status/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPatientTreatmentStatusFeatureUserResolver {
  constructor(private readonly service: ApiPatientTreatmentStatusDataAccessUserService) {}

  @Query(() => [PatientTreatmentStatus], { nullable: true })
  userPatientTreatmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.userPatientTreatmentStatuses(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPatientTreatmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.userCountPatientTreatmentStatuses(user.id, input)
  }

  @Query(() => [PatientTreatmentStatus], { nullable: true })
  userSelectPatientTreatmentStatuses(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientTreatmentStatusInput, nullable: true }) input?: UserListPatientTreatmentStatusInput,
  ) {
    return this.service.userSelectPatientTreatmentStatuses(user.id, input)
  }







  @Query(() => PatientTreatmentStatus, { nullable: true })
  userPatientTreatmentStatus(@CtxUser() user: User, @Args('patientTreatmentStatusId') patientTreatmentStatusId: string) {
    return this.service.userPatientTreatmentStatus(user.id, patientTreatmentStatusId)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  userCreatePatientTreatmentStatus(@CtxUser() user: User, @Args('input') input: UserCreatePatientTreatmentStatusInput,) {
    return this.service.userCreatePatientTreatmentStatus(user.id, input)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  userUpdatePatientTreatmentStatus(
    @CtxUser() user: User,
    @Args('patientTreatmentStatusId') patientTreatmentStatusId: string,
    @Args('input') input: UserUpdatePatientTreatmentStatusInput,
  ) {
    return this.service.userUpdatePatientTreatmentStatus(user.id, patientTreatmentStatusId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePatientTreatmentStatuses(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePatientTreatmentStatusesInput,
  ) {
    return this.service.userUpdatePatientTreatmentStatuses(user.id, input)
  }

  @Mutation(() => PatientTreatmentStatus, { nullable: true })
  userDeletePatientTreatmentStatus(@CtxUser() user: User, @Args('patientTreatmentStatusId') patientTreatmentStatusId: string) {
    return this.service.userDeletePatientTreatmentStatus(user.id, patientTreatmentStatusId)
  }
}

