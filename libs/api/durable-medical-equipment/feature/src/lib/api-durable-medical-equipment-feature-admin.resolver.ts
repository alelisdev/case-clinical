
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateDurableMedicalEquipmentInput,
  AdminListDurableMedicalEquipmentInput,
  AdminUpdateDurableMedicalEquipmentInput,
  ApiDurableMedicalEquipmentDataAccessAdminService,
  DurableMedicalEquipment
} from '@case-clinical/api/durable-medical-equipment/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiDurableMedicalEquipmentFeatureAdminResolver {
  constructor(private readonly service: ApiDurableMedicalEquipmentDataAccessAdminService) {}

  @Query(() => [DurableMedicalEquipment], { nullable: true })
  adminDurableMedicalEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDurableMedicalEquipmentInput, nullable: true }) input?: AdminListDurableMedicalEquipmentInput,
  ) {
    return this.service.adminDurableMedicalEquipments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountDurableMedicalEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListDurableMedicalEquipmentInput, nullable: true }) input?: AdminListDurableMedicalEquipmentInput,
  ) {
    return this.service.adminCountDurableMedicalEquipments(admin.id, input)
  }





  @Query(() => DurableMedicalEquipment, { nullable: true })
  adminDurableMedicalEquipment(@CtxUser() admin: User, @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string) {
    return this.service.adminDurableMedicalEquipment(admin.id, durableMedicalEquipmentId)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  adminCreateDurableMedicalEquipment(@CtxUser() admin: User, @Args('input') input: AdminCreateDurableMedicalEquipmentInput,) {
    return this.service.adminCreateDurableMedicalEquipment(admin.id, input)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  adminUpdateDurableMedicalEquipment(
    @CtxUser() admin: User,
    @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string,
    @Args('input') input: AdminUpdateDurableMedicalEquipmentInput,
  ) {
    return this.service.adminUpdateDurableMedicalEquipment(admin.id, durableMedicalEquipmentId, input)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  adminDeleteDurableMedicalEquipment(@CtxUser() admin: User, @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string) {
    return this.service.adminDeleteDurableMedicalEquipment(admin.id, durableMedicalEquipmentId)
  }
}

