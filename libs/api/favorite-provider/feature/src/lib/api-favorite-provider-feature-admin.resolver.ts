
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateFavoriteProviderInput,
  AdminListFavoriteProviderInput,
  AdminUpdateFavoriteProviderInput,
  ApiFavoriteProviderDataAccessAdminService,
  FavoriteProvider
} from '@case-clinical/api/favorite-provider/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiFavoriteProviderFeatureAdminResolver {
  constructor(private readonly service: ApiFavoriteProviderDataAccessAdminService) {}

  @Query(() => [FavoriteProvider], { nullable: true })
  adminFavoriteProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFavoriteProviderInput, nullable: true }) input?: AdminListFavoriteProviderInput,
  ) {
    return this.service.adminFavoriteProviders(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountFavoriteProviders(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListFavoriteProviderInput, nullable: true }) input?: AdminListFavoriteProviderInput,
  ) {
    return this.service.adminCountFavoriteProviders(admin.id, input)
  }





  @Query(() => FavoriteProvider, { nullable: true })
  adminFavoriteProvider(@CtxUser() admin: User, @Args('favoriteProviderId') favoriteProviderId: string) {
    return this.service.adminFavoriteProvider(admin.id, favoriteProviderId)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  adminCreateFavoriteProvider(@CtxUser() admin: User, @Args('input') input: AdminCreateFavoriteProviderInput,) {
    return this.service.adminCreateFavoriteProvider(admin.id, input)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  adminUpdateFavoriteProvider(
    @CtxUser() admin: User,
    @Args('favoriteProviderId') favoriteProviderId: string,
    @Args('input') input: AdminUpdateFavoriteProviderInput,
  ) {
    return this.service.adminUpdateFavoriteProvider(admin.id, favoriteProviderId, input)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  adminDeleteFavoriteProvider(@CtxUser() admin: User, @Args('favoriteProviderId') favoriteProviderId: string) {
    return this.service.adminDeleteFavoriteProvider(admin.id, favoriteProviderId)
  }
}

