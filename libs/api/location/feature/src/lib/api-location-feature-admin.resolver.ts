
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateLocationInput,
  AdminListLocationInput,
  AdminUpdateLocationInput,
  ApiLocationDataAccessAdminService,
  Location
} from '@case-clinical/api/location/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListPlaceOfServiceInput, PlaceOfService } from '@case-clinical/api/place-of-service/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiLocationFeatureAdminResolver {
  constructor(private readonly service: ApiLocationDataAccessAdminService) {}

  @Query(() => [Location], { nullable: true })
  adminLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLocationInput, nullable: true }) input?: AdminListLocationInput,
  ) {
    return this.service.adminLocations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListLocationInput, nullable: true }) input?: AdminListLocationInput,
  ) {
    return this.service.adminCountLocations(admin.id, input)
  }





  @Query(() => Location, { nullable: true })
  adminLocation(@CtxUser() admin: User, @Args('locationId') locationId: string) {
    return this.service.adminLocation(admin.id, locationId)
  }

  @Mutation(() => Location, { nullable: true })
  adminCreateLocation(@CtxUser() admin: User, @Args('input') input: AdminCreateLocationInput,) {
    return this.service.adminCreateLocation(admin.id, input)
  }

  @Mutation(() => Location, { nullable: true })
  adminUpdateLocation(
    @CtxUser() admin: User,
    @Args('locationId') locationId: string,
    @Args('input') input: AdminUpdateLocationInput,
  ) {
    return this.service.adminUpdateLocation(admin.id, locationId, input)
  }

  @Mutation(() => Location, { nullable: true })
  adminDeleteLocation(@CtxUser() admin: User, @Args('locationId') locationId: string) {
    return this.service.adminDeleteLocation(admin.id, locationId)
  }
}

