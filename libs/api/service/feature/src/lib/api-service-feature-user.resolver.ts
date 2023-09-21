
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateServiceInput,
  UserListServiceInput,
  UserUpdateServiceInput,
  UserUpdateServicesInput,
  ApiServiceDataAccessUserService,
  Service,
} from '@case-clinical/api/service/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiServiceFeatureUserResolver {
  constructor(private readonly service: ApiServiceDataAccessUserService) {}

  @Query(() => [Service], { nullable: true })
  userServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.userServices(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.userCountServices(user.id, input)
  }

  @Query(() => [Service], { nullable: true })
  userSelectServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListServiceInput, nullable: true }) input?: UserListServiceInput,
  ) {
    return this.service.userSelectServices(user.id, input)
  }







  @Query(() => Service, { nullable: true })
  userService(@CtxUser() user: User, @Args('serviceId') serviceId: string) {
    return this.service.userService(user.id, serviceId)
  }

  @Mutation(() => Service, { nullable: true })
  userCreateService(@CtxUser() user: User, @Args('input') input: UserCreateServiceInput,) {
    return this.service.userCreateService(user.id, input)
  }

  @Mutation(() => Service, { nullable: true })
  userUpdateService(
    @CtxUser() user: User,
    @Args('serviceId') serviceId: string,
    @Args('input') input: UserUpdateServiceInput,
  ) {
    return this.service.userUpdateService(user.id, serviceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateServices(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateServicesInput,
  ) {
    return this.service.userUpdateServices(user.id, input)
  }

  @Mutation(() => Service, { nullable: true })
  userDeleteService(@CtxUser() user: User, @Args('serviceId') serviceId: string) {
    return this.service.userDeleteService(user.id, serviceId)
  }
}

