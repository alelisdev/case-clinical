
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderInput,
  ApiClinicalProviderDataAccessPublicService,
  ClinicalProvider,
} from '@case-clinical/api/clinical-provider/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderDataAccessPublicService) {}
           
  @Query(() => [ClinicalProvider], { nullable: true })
  publicClinicalProviders(
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.publicClinicalProviders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviders(
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.publicCountClinicalProviders(input)
  }

  @Query(() => [ClinicalProvider], { nullable: true })
  publicSelectClinicalProviders(
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.publicSelectClinicalProviders(input)
  }

  @Query(() => ClinicalProvider, { nullable: true })
  publicClinicalProvider(@Args('clinicalProviderId') clinicalProviderId: string) {
    return this.service.publicClinicalProvider(clinicalProviderId)
  }
}
