
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderLocationAvailabilityInput,
  UserListClinicalProviderLocationAvailabilityInput,
  UserUpdateClinicalProviderLocationAvailabilityInput,
  UserUpdateClinicalProviderLocationAvailabilitiesInput,
  ApiClinicalProviderLocationAvailabilityDataAccessUserService,
  ClinicalProviderLocationAvailability,
} from '@case-clinical/api/clinical-provider-location-availability/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderLocationInput, ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderLocationAvailabilityFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderLocationAvailabilityDataAccessUserService) {}

  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  userClinicalProviderLocationAvailabilities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.userClinicalProviderLocationAvailabilities(user.id, input)
  }

  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  userClinicalProviderBusinessHours(
    @CtxUser() user: User,
    @Args('clinicalProviderId') clinicalProviderId: string
  ) {
    return this.service.userClinicalProviderBusinessHours(user.id, clinicalProviderId)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviderLocationAvailabilities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.userCountClinicalProviderLocationAvailabilities(user.id, input)
  }

  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  userSelectClinicalProviderLocationAvailabilities(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.userSelectClinicalProviderLocationAvailabilities(user.id, input)
  }







  @Query(() => ClinicalProviderLocationAvailability, { nullable: true })
  userClinicalProviderLocationAvailability(@CtxUser() user: User, @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string) {
    return this.service.userClinicalProviderLocationAvailability(user.id, clinicalProviderLocationAvailabilityId)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  userCreateClinicalProviderLocationAvailability(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderLocationAvailabilityInput,) {
    return this.service.userCreateClinicalProviderLocationAvailability(user.id, input)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  userUpdateClinicalProviderLocationAvailability(
    @CtxUser() user: User,
    @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string,
    @Args('input') input: UserUpdateClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.userUpdateClinicalProviderLocationAvailability(user.id, clinicalProviderLocationAvailabilityId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviderLocationAvailabilities(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProviderLocationAvailabilitiesInput,
  ) {
    return this.service.userUpdateClinicalProviderLocationAvailabilities(user.id, input)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  userDeleteClinicalProviderLocationAvailability(@CtxUser() user: User, @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string) {
    return this.service.userDeleteClinicalProviderLocationAvailability(user.id, clinicalProviderLocationAvailabilityId)
  }
}

