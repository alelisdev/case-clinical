
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListMedicalConditionProviderInput,
  ApiMedicalConditionProviderDataAccessPublicService,
  MedicalConditionProvider,
} from '@case-clinical/api/medical-condition-provider/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiMedicalConditionProviderFeaturePublicResolver {
  constructor(private readonly service: ApiMedicalConditionProviderDataAccessPublicService) {}
           
  @Query(() => [MedicalConditionProvider], { nullable: true })
  publicMedicalConditionProviders(
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.publicMedicalConditionProviders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountMedicalConditionProviders(
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.publicCountMedicalConditionProviders(input)
  }

  @Query(() => [MedicalConditionProvider], { nullable: true })
  publicSelectMedicalConditionProviders(
    @Args({ name: 'input', type: () => UserListMedicalConditionProviderInput, nullable: true }) input?: UserListMedicalConditionProviderInput,
  ) {
    return this.service.publicSelectMedicalConditionProviders(input)
  }

  @Query(() => MedicalConditionProvider, { nullable: true })
  publicMedicalConditionProvider(@Args('medicalConditionProviderId') medicalConditionProviderId: string) {
    return this.service.publicMedicalConditionProvider(medicalConditionProviderId)
  }
}
