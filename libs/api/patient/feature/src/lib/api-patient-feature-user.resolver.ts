
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePatientInput,
  UserListPatientInput,
  UserUpdatePatientInput,
  UserUpdatePatientsInput,
  ApiPatientDataAccessUserService,
  Patient,
} from '@case-clinical/api/patient/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListEthnicityInput, Ethnicity } from '@case-clinical/api/ethnicity/data-access'
import { UserListGenderInput, Gender } from '@case-clinical/api/gender/data-access'
import { UserListLanguageInput, Language } from '@case-clinical/api/language/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPatientFeatureUserResolver {
  constructor(private readonly service: ApiPatientDataAccessUserService) {}

  @Query(() => [Patient], { nullable: true })
  userPatients(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.userPatients(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPatients(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.userCountPatients(user.id, input)
  }

  @Query(() => [Patient], { nullable: true })
  userSelectPatients(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPatientInput, nullable: true }) input?: UserListPatientInput,
  ) {
    return this.service.userSelectPatients(user.id, input)
  }







  @Query(() => Patient, { nullable: true })
  userPatient(@CtxUser() user: User, @Args('patientId') patientId: string) {
    return this.service.userPatient(user.id, patientId)
  }

  @Mutation(() => Patient, { nullable: true })
  userCreatePatient(@CtxUser() user: User, @Args('input') input: UserCreatePatientInput,) {
    return this.service.userCreatePatient(user.id, input)
  }

  @Mutation(() => Patient, { nullable: true })
  userUpdatePatient(
    @CtxUser() user: User,
    @Args('patientId') patientId: string,
    @Args('input') input: UserUpdatePatientInput,
  ) {
    return this.service.userUpdatePatient(user.id, patientId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePatients(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePatientsInput,
  ) {
    return this.service.userUpdatePatients(user.id, input)
  }

  @Mutation(() => Patient, { nullable: true })
  userDeletePatient(@CtxUser() user: User, @Args('patientId') patientId: string) {
    return this.service.userDeletePatient(user.id, patientId)
  }
}

