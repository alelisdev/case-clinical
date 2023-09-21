
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateEquipmentInput,
  AdminListEquipmentInput,
  AdminUpdateEquipmentInput,
  ApiEquipmentDataAccessAdminService,
  Equipment
} from '@case-clinical/api/equipment/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiEquipmentFeatureAdminResolver {
  constructor(private readonly service: ApiEquipmentDataAccessAdminService) {}

  @Query(() => [Equipment], { nullable: true })
  adminEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEquipmentInput, nullable: true }) input?: AdminListEquipmentInput,
  ) {
    return this.service.adminEquipments(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountEquipments(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListEquipmentInput, nullable: true }) input?: AdminListEquipmentInput,
  ) {
    return this.service.adminCountEquipments(admin.id, input)
  }





  @Query(() => Equipment, { nullable: true })
  adminEquipment(@CtxUser() admin: User, @Args('equipmentId') equipmentId: string) {
    return this.service.adminEquipment(admin.id, equipmentId)
  }

  @Mutation(() => Equipment, { nullable: true })
  adminCreateEquipment(@CtxUser() admin: User, @Args('input') input: AdminCreateEquipmentInput,) {
    return this.service.adminCreateEquipment(admin.id, input)
  }

  @Mutation(() => Equipment, { nullable: true })
  adminUpdateEquipment(
    @CtxUser() admin: User,
    @Args('equipmentId') equipmentId: string,
    @Args('input') input: AdminUpdateEquipmentInput,
  ) {
    return this.service.adminUpdateEquipment(admin.id, equipmentId, input)
  }

  @Mutation(() => Equipment, { nullable: true })
  adminDeleteEquipment(@CtxUser() admin: User, @Args('equipmentId') equipmentId: string) {
    return this.service.adminDeleteEquipment(admin.id, equipmentId)
  }
}

