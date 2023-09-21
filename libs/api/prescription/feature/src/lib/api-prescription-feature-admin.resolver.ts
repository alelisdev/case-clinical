
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePrescriptionInput,
  AdminListPrescriptionInput,
  AdminUpdatePrescriptionInput,
  ApiPrescriptionDataAccessAdminService,
  Prescription
} from '@case-clinical/api/prescription/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPatientInput, Patient } from '@case-clinical/api/patient/data-access'
import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPrescriptionFeatureAdminResolver {
  constructor(private readonly service: ApiPrescriptionDataAccessAdminService) {}

  @Query(() => [Prescription], { nullable: true })
  adminPrescriptions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPrescriptionInput, nullable: true }) input?: AdminListPrescriptionInput,
  ) {
    return this.service.adminPrescriptions(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPrescriptions(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPrescriptionInput, nullable: true }) input?: AdminListPrescriptionInput,
  ) {
    return this.service.adminCountPrescriptions(admin.id, input)
  }





  @Query(() => Prescription, { nullable: true })
  adminPrescription(@CtxUser() admin: User, @Args('prescriptionId') prescriptionId: string) {
    return this.service.adminPrescription(admin.id, prescriptionId)
  }

  @Mutation(() => Prescription, { nullable: true })
  adminCreatePrescription(@CtxUser() admin: User, @Args('input') input: AdminCreatePrescriptionInput,) {
    return this.service.adminCreatePrescription(admin.id, input)
  }

  @Mutation(() => Prescription, { nullable: true })
  adminUpdatePrescription(
    @CtxUser() admin: User,
    @Args('prescriptionId') prescriptionId: string,
    @Args('input') input: AdminUpdatePrescriptionInput,
  ) {
    return this.service.adminUpdatePrescription(admin.id, prescriptionId, input)
  }

  @Mutation(() => Prescription, { nullable: true })
  adminDeletePrescription(@CtxUser() admin: User, @Args('prescriptionId') prescriptionId: string) {
    return this.service.adminDeletePrescription(admin.id, prescriptionId)
  }
}

