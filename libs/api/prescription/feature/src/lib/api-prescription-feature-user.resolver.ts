
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePrescriptionInput,
  UserListPrescriptionInput,
  UserUpdatePrescriptionInput,
  UserUpdatePrescriptionsInput,
  ApiPrescriptionDataAccessUserService,
  Prescription,
} from '@case-clinical/api/prescription/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { UserListDocumentInput, Document } from '@case-clinical/api/document/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPrescriptionFeatureUserResolver {
  constructor(private readonly service: ApiPrescriptionDataAccessUserService) {}

  @Query(() => [Prescription], { nullable: true })
  userPrescriptions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.userPrescriptions(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPrescriptions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.userCountPrescriptions(user.id, input)
  }

  @Query(() => [Prescription], { nullable: true })
  userSelectPrescriptions(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPrescriptionInput, nullable: true }) input?: UserListPrescriptionInput,
  ) {
    return this.service.userSelectPrescriptions(user.id, input)
  }







  @Query(() => Prescription, { nullable: true })
  userPrescription(@CtxUser() user: User, @Args('prescriptionId') prescriptionId: string) {
    return this.service.userPrescription(user.id, prescriptionId)
  }

  @Mutation(() => Prescription, { nullable: true })
  userCreatePrescription(@CtxUser() user: User, @Args('input') input: UserCreatePrescriptionInput,) {
    return this.service.userCreatePrescription(user.id, input)
  }

  @Mutation(() => Prescription, { nullable: true })
  userUpdatePrescription(
    @CtxUser() user: User,
    @Args('prescriptionId') prescriptionId: string,
    @Args('input') input: UserUpdatePrescriptionInput,
  ) {
    return this.service.userUpdatePrescription(user.id, prescriptionId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePrescriptions(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePrescriptionsInput,
  ) {
    return this.service.userUpdatePrescriptions(user.id, input)
  }

  @Mutation(() => Prescription, { nullable: true })
  userDeletePrescription(@CtxUser() user: User, @Args('prescriptionId') prescriptionId: string) {
    return this.service.userDeletePrescription(user.id, prescriptionId)
  }
}

