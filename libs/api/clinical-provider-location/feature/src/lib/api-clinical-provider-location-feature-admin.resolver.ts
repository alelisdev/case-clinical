
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateClinicalProviderLocationInput,
  AdminListClinicalProviderLocationInput,
  AdminUpdateClinicalProviderLocationInput,
  ApiClinicalProviderLocationDataAccessAdminService,
  ClinicalProviderLocation
} from '@case-clinical/api/clinical-provider-location/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListLocationInput, Location } from '@case-clinical/api/location/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiClinicalProviderLocationFeatureAdminResolver {
  constructor(private readonly service: ApiClinicalProviderLocationDataAccessAdminService) {}

  @Query(() => [ClinicalProviderLocation], { nullable: true })
  adminClinicalProviderLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderLocationInput, nullable: true }) input?: AdminListClinicalProviderLocationInput,
  ) {
    return this.service.adminClinicalProviderLocations(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountClinicalProviderLocations(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListClinicalProviderLocationInput, nullable: true }) input?: AdminListClinicalProviderLocationInput,
  ) {
    return this.service.adminCountClinicalProviderLocations(admin.id, input)
  }





  @Query(() => ClinicalProviderLocation, { nullable: true })
  adminClinicalProviderLocation(@CtxUser() admin: User, @Args('clinicalProviderLocationId') clinicalProviderLocationId: string) {
    return this.service.adminClinicalProviderLocation(admin.id, clinicalProviderLocationId)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  adminCreateClinicalProviderLocation(@CtxUser() admin: User, @Args('input') input: AdminCreateClinicalProviderLocationInput,) {
    return this.service.adminCreateClinicalProviderLocation(admin.id, input)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  adminUpdateClinicalProviderLocation(
    @CtxUser() admin: User,
    @Args('clinicalProviderLocationId') clinicalProviderLocationId: string,
    @Args('input') input: AdminUpdateClinicalProviderLocationInput,
  ) {
    return this.service.adminUpdateClinicalProviderLocation(admin.id, clinicalProviderLocationId, input)
  }

  @Mutation(() => ClinicalProviderLocation, { nullable: true })
  adminDeleteClinicalProviderLocation(@CtxUser() admin: User, @Args('clinicalProviderLocationId') clinicalProviderLocationId: string) {
    return this.service.adminDeleteClinicalProviderLocation(admin.id, clinicalProviderLocationId)
  }
}

