
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderServiceInput,
  ApiClinicalProviderServiceDataAccessPublicService,
  ClinicalProviderService,
} from '@case-clinical/api/clinical-provider-service/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderServiceFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderServiceDataAccessPublicService) {}
           
  @Query(() => [ClinicalProviderService], { nullable: true })
  publicClinicalProviderServices(
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.publicClinicalProviderServices(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviderServices(
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.publicCountClinicalProviderServices(input)
  }

  @Query(() => [ClinicalProviderService], { nullable: true })
  publicSelectClinicalProviderServices(
    @Args({ name: 'input', type: () => UserListClinicalProviderServiceInput, nullable: true }) input?: UserListClinicalProviderServiceInput,
  ) {
    return this.service.publicSelectClinicalProviderServices(input)
  }

  @Query(() => ClinicalProviderService, { nullable: true })
  publicClinicalProviderService(@Args('clinicalProviderServiceId') clinicalProviderServiceId: string) {
    return this.service.publicClinicalProviderService(clinicalProviderServiceId)
  }
}
