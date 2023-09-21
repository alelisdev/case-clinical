
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePatientStudyInput,
  UserListPatientStudyInput,
  UserUpdatePatientStudyInput,
  UserUpdatePatientStudiesInput,
  ApiPatientStudyDataAccessUserService,
  PatientStudy,
} from '@case-clinical/api/patient-study/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPatientStudyFeatureUserResolver {
  constructor(private readonly service: ApiPatientStudyDataAccessUserService) {}

  @Query(() => [PatientStudy], { nullable: true })
  userPatientStudies(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.userPatientStudies(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPatientStudies(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.userCountPatientStudies(user.id, input)
  }

  @Query(() => [PatientStudy], { nullable: true })
  userSelectPatientStudies(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientStudyInput, nullable: true }) input?: UserListPatientStudyInput,
  ) {
    return this.service.userSelectPatientStudies(user.id, input)
  }







  @Query(() => PatientStudy, { nullable: true })
  userPatientStudy(@CtxUser() user: User, @Args('patientStudyId') patientStudyId: string) {
    return this.service.userPatientStudy(user.id, patientStudyId)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  userCreatePatientStudy(@CtxUser() user: User, @Args('input') input: UserCreatePatientStudyInput,) {
    return this.service.userCreatePatientStudy(user.id, input)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  userUpdatePatientStudy(
    @CtxUser() user: User,
    @Args('patientStudyId') patientStudyId: string,
    @Args('input') input: UserUpdatePatientStudyInput,
  ) {
    return this.service.userUpdatePatientStudy(user.id, patientStudyId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePatientStudies(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePatientStudiesInput,
  ) {
    return this.service.userUpdatePatientStudies(user.id, input)
  }

  @Mutation(() => PatientStudy, { nullable: true })
  userDeletePatientStudy(@CtxUser() user: User, @Args('patientStudyId') patientStudyId: string) {
    return this.service.userDeletePatientStudy(user.id, patientStudyId)
  }
}

