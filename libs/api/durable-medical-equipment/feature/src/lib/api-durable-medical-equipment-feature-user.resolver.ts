
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateDurableMedicalEquipmentInput,
  UserListDurableMedicalEquipmentInput,
  UserUpdateDurableMedicalEquipmentInput,
  UserUpdateDurableMedicalEquipmentsInput,
  ApiDurableMedicalEquipmentDataAccessUserService,
  DurableMedicalEquipment,
} from '@case-clinical/api/durable-medical-equipment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiDurableMedicalEquipmentFeatureUserResolver {
  constructor(private readonly service: ApiDurableMedicalEquipmentDataAccessUserService) {}

  @Query(() => [DurableMedicalEquipment], { nullable: true })
  userDurableMedicalEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.userDurableMedicalEquipments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountDurableMedicalEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.userCountDurableMedicalEquipments(user.id, input)
  }

  @Query(() => [DurableMedicalEquipment], { nullable: true })
  userSelectDurableMedicalEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListDurableMedicalEquipmentInput, nullable: true }) input?: UserListDurableMedicalEquipmentInput,
  ) {
    return this.service.userSelectDurableMedicalEquipments(user.id, input)
  }







  @Query(() => DurableMedicalEquipment, { nullable: true })
  userDurableMedicalEquipment(@CtxUser() user: User, @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string) {
    return this.service.userDurableMedicalEquipment(user.id, durableMedicalEquipmentId)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  userCreateDurableMedicalEquipment(@CtxUser() user: User, @Args('input') input: UserCreateDurableMedicalEquipmentInput,) {
    return this.service.userCreateDurableMedicalEquipment(user.id, input)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  userUpdateDurableMedicalEquipment(
    @CtxUser() user: User,
    @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string,
    @Args('input') input: UserUpdateDurableMedicalEquipmentInput,
  ) {
    return this.service.userUpdateDurableMedicalEquipment(user.id, durableMedicalEquipmentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateDurableMedicalEquipments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateDurableMedicalEquipmentsInput,
  ) {
    return this.service.userUpdateDurableMedicalEquipments(user.id, input)
  }

  @Mutation(() => DurableMedicalEquipment, { nullable: true })
  userDeleteDurableMedicalEquipment(@CtxUser() user: User, @Args('durableMedicalEquipmentId') durableMedicalEquipmentId: string) {
    return this.service.userDeleteDurableMedicalEquipment(user.id, durableMedicalEquipmentId)
  }
}

