
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListClinicalProviderTagInput,
  ApiClinicalProviderTagDataAccessPublicService,
  ClinicalProviderTag,
} from '@case-clinical/api/clinical-provider-tag/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiClinicalProviderTagFeaturePublicResolver {
  constructor(private readonly service: ApiClinicalProviderTagDataAccessPublicService) {}
           
  @Query(() => [ClinicalProviderTag], { nullable: true })
  publicClinicalProviderTags(
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.publicClinicalProviderTags(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountClinicalProviderTags(
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.publicCountClinicalProviderTags(input)
  }

  @Query(() => [ClinicalProviderTag], { nullable: true })
  publicSelectClinicalProviderTags(
    @Args({ name: 'input', type: () => UserListClinicalProviderTagInput, nullable: true }) input?: UserListClinicalProviderTagInput,
  ) {
    return this.service.publicSelectClinicalProviderTags(input)
  }

  @Query(() => ClinicalProviderTag, { nullable: true })
  publicClinicalProviderTag(@Args('clinicalProviderTagId') clinicalProviderTagId: string) {
    return this.service.publicClinicalProviderTag(clinicalProviderTagId)
  }
}
