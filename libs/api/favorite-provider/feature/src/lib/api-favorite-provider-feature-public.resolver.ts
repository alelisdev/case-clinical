
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListFavoriteProviderInput,
  ApiFavoriteProviderDataAccessPublicService,
  FavoriteProvider,
} from '@case-clinical/api/favorite-provider/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiFavoriteProviderFeaturePublicResolver {
  constructor(private readonly service: ApiFavoriteProviderDataAccessPublicService) {}
           
  @Query(() => [FavoriteProvider], { nullable: true })
  publicFavoriteProviders(
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.publicFavoriteProviders(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountFavoriteProviders(
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.publicCountFavoriteProviders(input)
  }

  @Query(() => [FavoriteProvider], { nullable: true })
  publicSelectFavoriteProviders(
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.publicSelectFavoriteProviders(input)
  }

  @Query(() => FavoriteProvider, { nullable: true })
  publicFavoriteProvider(@Args('favoriteProviderId') favoriteProviderId: string) {
    return this.service.publicFavoriteProvider(favoriteProviderId)
  }
}
