
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderSpecialtyInput,
  ApiClinicalProviderSpecialtyDataAccessPublicService,
  ClinicalProviderSpecialty,
} from '@case-clinical/api/clinical-provider-specialty/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderSpecialtyFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderSpecialtyDataAccessPublicService) {}
           
  @Query(() => [ClinicalProviderSpecialty], { nullable: true })
  publicClinicalProviderSpecialties(
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.publicClinicalProviderSpecialties(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviderSpecialties(
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.publicCountClinicalProviderSpecialties(input)
  }

  @Query(() => [ClinicalProviderSpecialty], { nullable: true })
  publicSelectClinicalProviderSpecialties(
    @Args({ name: 'input', type: () => UserListClinicalProviderSpecialtyInput, nullable: true }) input?: UserListClinicalProviderSpecialtyInput,
  ) {
    return this.service.publicSelectClinicalProviderSpecialties(input)
  }

  @Query(() => ClinicalProviderSpecialty, { nullable: true })
  publicClinicalProviderSpecialty(@Args('clinicalProviderSpecialtyId') clinicalProviderSpecialtyId: string) {
    return this.service.publicClinicalProviderSpecialty(clinicalProviderSpecialtyId)
  }
}
