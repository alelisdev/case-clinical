
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLocationInput,
  UserListLocationInput,
  UserUpdateLocationInput,
  UserUpdateLocationsInput,
  ApiLocationDataAccessUserService,
  Location,
} from '@case-clinical/api/location/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListPlaceOfServiceInput, PlaceOfService } from '@case-clinical/api/place-of-service/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLocationFeatureUserResolver {
  constructor(private readonly service: ApiLocationDataAccessUserService) {}

  @Query(() => [Location], { nullable: true })
  userLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.userLocations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.userCountLocations(user.id, input)
  }

  @Query(() => [Location], { nullable: true })
  userSelectLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLocationInput, nullable: true }) input?: UserListLocationInput,
  ) {
    return this.service.userSelectLocations(user.id, input)
  }







  @Query(() => Location, { nullable: true })
  userLocation(@CtxUser() user: User, @Args('locationId') locationId: string) {
    return this.service.userLocation(user.id, locationId)
  }

  @Mutation(() => Location, { nullable: true })
  userCreateLocation(@CtxUser() user: User, @Args('input') input: UserCreateLocationInput,) {
    return this.service.userCreateLocation(user.id, input)
  }

  @Mutation(() => Location, { nullable: true })
  userUpdateLocation(
    @CtxUser() user: User,
    @Args('locationId') locationId: string,
    @Args('input') input: UserUpdateLocationInput,
  ) {
    return this.service.userUpdateLocation(user.id, locationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLocations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLocationsInput,
  ) {
    return this.service.userUpdateLocations(user.id, input)
  }

  @Mutation(() => Location, { nullable: true })
  userDeleteLocation(@CtxUser() user: User, @Args('locationId') locationId: string) {
    return this.service.userDeleteLocation(user.id, locationId)
  }
}

