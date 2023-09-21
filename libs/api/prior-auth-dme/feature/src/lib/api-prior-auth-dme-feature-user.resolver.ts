
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthDmeInput,
  UserListPriorAuthDmeInput,
  UserUpdatePriorAuthDmeInput,
  UserUpdatePriorAuthDmesInput,
  ApiPriorAuthDmeDataAccessUserService,
  PriorAuthDme,
} from '@case-clinical/api/prior-auth-dme/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserListDurableMedicalEquipmentInput, DurableMedicalEquipment } from '@case-clinical/api/durable-medical-equipment/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthDmeFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthDmeDataAccessUserService) {}

  @Query(() => [PriorAuthDme], { nullable: true })
  userPriorAuthDmes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.userPriorAuthDmes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthDmes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.userCountPriorAuthDmes(user.id, input)
  }

  @Query(() => [PriorAuthDme], { nullable: true })
  userSelectPriorAuthDmes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthDmeInput, nullable: true }) input?: UserListPriorAuthDmeInput,
  ) {
    return this.service.userSelectPriorAuthDmes(user.id, input)
  }







  @Query(() => PriorAuthDme, { nullable: true })
  userPriorAuthDme(@CtxUser() user: User, @Args('priorAuthDmeId') priorAuthDmeId: string) {
    return this.service.userPriorAuthDme(user.id, priorAuthDmeId)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  userCreatePriorAuthDme(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthDmeInput,) {
    return this.service.userCreatePriorAuthDme(user.id, input)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  userUpdatePriorAuthDme(
    @CtxUser() user: User,
    @Args('priorAuthDmeId') priorAuthDmeId: string,
    @Args('input') input: UserUpdatePriorAuthDmeInput,
  ) {
    return this.service.userUpdatePriorAuthDme(user.id, priorAuthDmeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthDmes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthDmesInput,
  ) {
    return this.service.userUpdatePriorAuthDmes(user.id, input)
  }

  @Mutation(() => PriorAuthDme, { nullable: true })
  userDeletePriorAuthDme(@CtxUser() user: User, @Args('priorAuthDmeId') priorAuthDmeId: string) {
    return this.service.userDeletePriorAuthDme(user.id, priorAuthDmeId)
  }
}

