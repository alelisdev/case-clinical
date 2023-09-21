
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthorizationEquipmentInput,
  UserListPriorAuthorizationEquipmentInput,
  UserUpdatePriorAuthorizationEquipmentInput,
  UserUpdatePriorAuthorizationEquipmentsInput,
  ApiPriorAuthorizationEquipmentDataAccessUserService,
  PriorAuthorizationEquipment,
} from '@case-clinical/api/prior-authorization-equipment/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListEquipmentInput, Equipment } from '@case-clinical/api/equipment/data-access'
import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthorizationEquipmentFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthorizationEquipmentDataAccessUserService) {}

  @Query(() => [PriorAuthorizationEquipment], { nullable: true })
  userPriorAuthorizationEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.userPriorAuthorizationEquipments(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthorizationEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.userCountPriorAuthorizationEquipments(user.id, input)
  }

  @Query(() => [PriorAuthorizationEquipment], { nullable: true })
  userSelectPriorAuthorizationEquipments(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationEquipmentInput, nullable: true }) input?: UserListPriorAuthorizationEquipmentInput,
  ) {
    return this.service.userSelectPriorAuthorizationEquipments(user.id, input)
  }







  @Query(() => PriorAuthorizationEquipment, { nullable: true })
  userPriorAuthorizationEquipment(@CtxUser() user: User, @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string) {
    return this.service.userPriorAuthorizationEquipment(user.id, priorAuthorizationEquipmentId)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  userCreatePriorAuthorizationEquipment(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthorizationEquipmentInput,) {
    return this.service.userCreatePriorAuthorizationEquipment(user.id, input)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  userUpdatePriorAuthorizationEquipment(
    @CtxUser() user: User,
    @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string,
    @Args('input') input: UserUpdatePriorAuthorizationEquipmentInput,
  ) {
    return this.service.userUpdatePriorAuthorizationEquipment(user.id, priorAuthorizationEquipmentId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthorizationEquipments(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthorizationEquipmentsInput,
  ) {
    return this.service.userUpdatePriorAuthorizationEquipments(user.id, input)
  }

  @Mutation(() => PriorAuthorizationEquipment, { nullable: true })
  userDeletePriorAuthorizationEquipment(@CtxUser() user: User, @Args('priorAuthorizationEquipmentId') priorAuthorizationEquipmentId: string) {
    return this.service.userDeletePriorAuthorizationEquipment(user.id, priorAuthorizationEquipmentId)
  }
}

