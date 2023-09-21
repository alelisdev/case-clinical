
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderLocationAvailabilityInput,
  AdminListClinicalProviderLocationAvailabilityInput,
  AdminUpdateClinicalProviderLocationAvailabilityInput,
  ApiClinicalProviderLocationAvailabilityDataAccessAdminService,
  ClinicalProviderLocationAvailability
} from '@case-clinical/api/clinical-provider-location-availability/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderLocationInput, ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderLocationAvailabilityFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderLocationAvailabilityDataAccessAdminService) {}

  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  adminClinicalProviderLocationAvailabilities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: AdminListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.adminClinicalProviderLocationAvailabilities(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviderLocationAvailabilities(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: AdminListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.adminCountClinicalProviderLocationAvailabilities(admin.id, input)
  }





  @Query(() => ClinicalProviderLocationAvailability, { nullable: true })
  adminClinicalProviderLocationAvailability(@CtxUser() admin: User, @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string) {
    return this.service.adminClinicalProviderLocationAvailability(admin.id, clinicalProviderLocationAvailabilityId)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  adminCreateClinicalProviderLocationAvailability(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderLocationAvailabilityInput,) {
    return this.service.adminCreateClinicalProviderLocationAvailability(admin.id, input)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  adminUpdateClinicalProviderLocationAvailability(
    @CtxUser() admin: User,
    @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string,
    @Args('input') input: AdminUpdateClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.adminUpdateClinicalProviderLocationAvailability(admin.id, clinicalProviderLocationAvailabilityId, input)
  }

  @Mutation(() => ClinicalProviderLocationAvailability, { nullable: true })
  adminDeleteClinicalProviderLocationAvailability(@CtxUser() admin: User, @Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string) {
    return this.service.adminDeleteClinicalProviderLocationAvailability(admin.id, clinicalProviderLocationAvailabilityId)
  }
}

