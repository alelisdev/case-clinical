
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPchProviderInput,
  ApiPchProviderDataAccessPublicService,
  PchProvider,
} from '@case-clinical/api/pch-provider/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPchProviderFeaturePublicResolver {
  constructor(private readonly service: ApiPchProviderDataAccessPublicService) {}
           
  @Query(() => [PchProvider], { nullable: true })
  publicPchProviders(
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.publicPchProviders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPchProviders(
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.publicCountPchProviders(input)
  }

  @Query(() => [PchProvider], { nullable: true })
  publicSelectPchProviders(
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.publicSelectPchProviders(input)
  }

  @Query(() => PchProvider, { nullable: true })
  publicPchProvider(@Args('pchProviderId') pchProviderId: string) {
    return this.service.publicPchProvider(pchProviderId)
  }
}
