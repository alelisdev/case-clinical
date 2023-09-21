
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderLocationInput,
  UserListClinicalProviderLocationInput,
  UserUpdateClinicalProviderLocationInput,
  UserUpdateClinicalProviderLocationsInput,
  ApiClinicalProviderLocationDataAccessUserService,
  ClinicalProviderLocation,
} from '@case-clinical/api/clinical-provider-location/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { UserListLocationInput, Location } from '@case-clinical/api/location/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderLocationFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderLocationDataAccessUserService) {}

  @Query(() => [ClinicalProviderLocation], { nullable: true })
  userClinicalProviderLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.userClinicalProviderLocations(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviderLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.userCountClinicalProviderLocations(user.id, input)
  }

  @Query(() => [ClinicalProviderLocation], { nullable: true })
  userSelectClinicalProviderLocations(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.userSelectClinicalProviderLocations(user.id, input)
  }







  @Query(() => ClinicalProviderLocation, { nullable: true })
  userClinicalProviderLocation(@CtxUser() user: User, @Args('clinicalProviderLocationId') clinicalProviderLocationId: string) {
    return this.service.userClinicalProviderLocation(user.id, clinicalProviderLocationId)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  userCreateClinicalProviderLocation(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderLocationInput,) {
    return this.service.userCreateClinicalProviderLocation(user.id, input)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  userUpdateClinicalProviderLocation(
    @CtxUser() user: User,
    @Args('clinicalProviderLocationId') clinicalProviderLocationId: string,
    @Args('input') input: UserUpdateClinicalProviderLocationInput,
  ) {
    return this.service.userUpdateClinicalProviderLocation(user.id, clinicalProviderLocationId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviderLocations(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProviderLocationsInput,
  ) {
    return this.service.userUpdateClinicalProviderLocations(user.id, input)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  userDeleteClinicalProviderLocation(@CtxUser() user: User, @Args('clinicalProviderLocationId') clinicalProviderLocationId: string) {
    return this.service.userDeleteClinicalProviderLocation(user.id, clinicalProviderLocationId)
  }
}

