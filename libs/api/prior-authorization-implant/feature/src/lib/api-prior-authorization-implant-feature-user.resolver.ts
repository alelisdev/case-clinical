
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthorizationImplantInput,
  UserListPriorAuthorizationImplantInput,
  UserUpdatePriorAuthorizationImplantInput,
  UserUpdatePriorAuthorizationImplantsInput,
  ApiPriorAuthorizationImplantDataAccessUserService,
  PriorAuthorizationImplant,
} from '@case-clinical/api/prior-authorization-implant/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListImplantInput, Implant } from '@case-clinical/api/implant/data-access'
import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthorizationImplantFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthorizationImplantDataAccessUserService) {}

  @Query(() => [PriorAuthorizationImplant], { nullable: true })
  userPriorAuthorizationImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.userPriorAuthorizationImplants(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthorizationImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.userCountPriorAuthorizationImplants(user.id, input)
  }

  @Query(() => [PriorAuthorizationImplant], { nullable: true })
  userSelectPriorAuthorizationImplants(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationImplantInput, nullable: true }) input?: UserListPriorAuthorizationImplantInput,
  ) {
    return this.service.userSelectPriorAuthorizationImplants(user.id, input)
  }







  @Query(() => PriorAuthorizationImplant, { nullable: true })
  userPriorAuthorizationImplant(@CtxUser() user: User, @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string) {
    return this.service.userPriorAuthorizationImplant(user.id, priorAuthorizationImplantId)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  userCreatePriorAuthorizationImplant(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthorizationImplantInput,) {
    return this.service.userCreatePriorAuthorizationImplant(user.id, input)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  userUpdatePriorAuthorizationImplant(
    @CtxUser() user: User,
    @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string,
    @Args('input') input: UserUpdatePriorAuthorizationImplantInput,
  ) {
    return this.service.userUpdatePriorAuthorizationImplant(user.id, priorAuthorizationImplantId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthorizationImplants(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthorizationImplantsInput,
  ) {
    return this.service.userUpdatePriorAuthorizationImplants(user.id, input)
  }

  @Mutation(() => PriorAuthorizationImplant, { nullable: true })
  userDeletePriorAuthorizationImplant(@CtxUser() user: User, @Args('priorAuthorizationImplantId') priorAuthorizationImplantId: string) {
    return this.service.userDeletePriorAuthorizationImplant(user.id, priorAuthorizationImplantId)
  }
}

