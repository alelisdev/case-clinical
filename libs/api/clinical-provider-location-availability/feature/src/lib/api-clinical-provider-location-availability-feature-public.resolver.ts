
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderLocationAvailabilityInput,
  ApiClinicalProviderLocationAvailabilityDataAccessPublicService,
  ClinicalProviderLocationAvailability,
} from '@case-clinical/api/clinical-provider-location-availability/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderLocationAvailabilityFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderLocationAvailabilityDataAccessPublicService) {}
           
  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  publicClinicalProviderLocationAvailabilities(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.publicClinicalProviderLocationAvailabilities(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviderLocationAvailabilities(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.publicCountClinicalProviderLocationAvailabilities(input)
  }

  @Query(() => [ClinicalProviderLocationAvailability], { nullable: true })
  publicSelectClinicalProviderLocationAvailabilities(
    @Args({ name: 'input', type: () => UserListClinicalProviderLocationAvailabilityInput, nullable: true }) input?: UserListClinicalProviderLocationAvailabilityInput,
  ) {
    return this.service.publicSelectClinicalProviderLocationAvailabilities(input)
  }

  @Query(() => ClinicalProviderLocationAvailability, { nullable: true })
  publicClinicalProviderLocationAvailability(@Args('clinicalProviderLocationAvailabilityId') clinicalProviderLocationAvailabilityId: string) {
    return this.service.publicClinicalProviderLocationAvailability(clinicalProviderLocationAvailabilityId)
  }
}
