
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateEquipmentInput,
  UserListEquipmentInput,
  UserUpdateEquipmentInput,
  UserUpdateEquipmentsInput,
  ApiEquipmentDataAccessUserService,
  Equipment,
} from '@case-clinical/api/equipment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiEquipmentFeatureUserResolver {
  constructor(private readonly service: ApiEquipmentDataAccessUserService) {}

  @Query(() => [Equipment], { nullable: true })
  userEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.userEquipments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.userCountEquipments(user.id, input)
  }

  @Query(() => [Equipment], { nullable: true })
  userSelectEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListEquipmentInput, nullable: true }) input?: UserListEquipmentInput,
  ) {
    return this.service.userSelectEquipments(user.id, input)
  }







  @Query(() => Equipment, { nullable: true })
  userEquipment(@CtxUser() user: User, @Args('equipmentId') equipmentId: string) {
    return this.service.userEquipment(user.id, equipmentId)
  }

  @Mutation(() => Equipment, { nullable: true })
  userCreateEquipment(@CtxUser() user: User, @Args('input') input: UserCreateEquipmentInput,) {
    return this.service.userCreateEquipment(user.id, input)
  }

  @Mutation(() => Equipment, { nullable: true })
  userUpdateEquipment(
    @CtxUser() user: User,
    @Args('equipmentId') equipmentId: string,
    @Args('input') input: UserUpdateEquipmentInput,
  ) {
    return this.service.userUpdateEquipment(user.id, equipmentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateEquipments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateEquipmentsInput,
  ) {
    return this.service.userUpdateEquipments(user.id, input)
  }

  @Mutation(() => Equipment, { nullable: true })
  userDeleteEquipment(@CtxUser() user: User, @Args('equipmentId') equipmentId: string) {
    return this.service.userDeleteEquipment(user.id, equipmentId)
  }
}

