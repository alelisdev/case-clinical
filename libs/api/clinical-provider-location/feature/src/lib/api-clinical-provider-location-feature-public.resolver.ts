
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderLocationInput,
  ApiClinicalProviderLocationDataAccessPublicService,
  ClinicalProviderLocation,
} from '@case-clinical/api/clinical-provider-location/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderLocationFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderLocationDataAccessPublicService) {}
           
  @Query(() => [ClinicalProviderLocation], { nullable: true })
  publicClinicalProviderLocations(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.publicClinicalProviderLocations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviderLocations(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.publicCountClinicalProviderLocations(input)
  }

  @Query(() => [ClinicalProviderLocation], { nullable: true })
  publicSelectClinicalProviderLocations(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationInput, nullable: true }) input?: UserListClinicalProviderLocationInput,
  ) {
    return this.service.publicSelectClinicalProviderLocations(input)
  }

  @Query(() => ClinicalProviderLocation, { nullable: true })
  publicClinicalProviderLocation(@Args('clinicalProviderLocationId') clinicalProviderLocationId: string) {
    return this.service.publicClinicalProviderLocation(clinicalProviderLocationId)
  }
}
