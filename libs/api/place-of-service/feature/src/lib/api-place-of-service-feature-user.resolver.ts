
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePlaceOfServiceInput,
  UserListPlaceOfServiceInput,
  UserUpdatePlaceOfServiceInput,
  UserUpdatePlaceOfServicesInput,
  ApiPlaceOfServiceDataAccessUserService,
  PlaceOfService,
} from '@case-clinical/api/place-of-service/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPlaceOfServiceFeatureUserResolver {
  constructor(private readonly service: ApiPlaceOfServiceDataAccessUserService) {}

  @Query(() => [PlaceOfService], { nullable: true })
  userPlaceOfServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.userPlaceOfServices(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPlaceOfServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.userCountPlaceOfServices(user.id, input)
  }

  @Query(() => [PlaceOfService], { nullable: true })
  userSelectPlaceOfServices(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPlaceOfServiceInput, nullable: true }) input?: UserListPlaceOfServiceInput,
  ) {
    return this.service.userSelectPlaceOfServices(user.id, input)
  }







  @Query(() => PlaceOfService, { nullable: true })
  userPlaceOfService(@CtxUser() user: User, @Args('placeOfServiceId') placeOfServiceId: string) {
    return this.service.userPlaceOfService(user.id, placeOfServiceId)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  userCreatePlaceOfService(@CtxUser() user: User, @Args('input') input: UserCreatePlaceOfServiceInput,) {
    return this.service.userCreatePlaceOfService(user.id, input)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  userUpdatePlaceOfService(
    @CtxUser() user: User,
    @Args('placeOfServiceId') placeOfServiceId: string,
    @Args('input') input: UserUpdatePlaceOfServiceInput,
  ) {
    return this.service.userUpdatePlaceOfService(user.id, placeOfServiceId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePlaceOfServices(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePlaceOfServicesInput,
  ) {
    return this.service.userUpdatePlaceOfServices(user.id, input)
  }

  @Mutation(() => PlaceOfService, { nullable: true })
  userDeletePlaceOfService(@CtxUser() user: User, @Args('placeOfServiceId') placeOfServiceId: string) {
    return this.service.userDeletePlaceOfService(user.id, placeOfServiceId)
  }
}

