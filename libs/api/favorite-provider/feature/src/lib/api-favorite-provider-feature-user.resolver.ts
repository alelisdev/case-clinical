
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateFavoriteProviderInput,
  UserListFavoriteProviderInput,
  UserUpdateFavoriteProviderInput,
  UserUpdateFavoriteProvidersInput,
  ApiFavoriteProviderDataAccessUserService,
  FavoriteProvider,
} from '@case-clinical/api/favorite-provider/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiFavoriteProviderFeatureUserResolver {
  constructor(private readonly service: ApiFavoriteProviderDataAccessUserService) {}

  @Query(() => [FavoriteProvider], { nullable: true })
  userFavoriteProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.userFavoriteProviders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountFavoriteProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.userCountFavoriteProviders(user.id, input)
  }

  @Query(() => [FavoriteProvider], { nullable: true })
  userSelectFavoriteProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListFavoriteProviderInput, nullable: true }) input?: UserListFavoriteProviderInput,
  ) {
    return this.service.userSelectFavoriteProviders(user.id, input)
  }







  @Query(() => FavoriteProvider, { nullable: true })
  userFavoriteProvider(@CtxUser() user: User, @Args('favoriteProviderId') favoriteProviderId: string) {
    return this.service.userFavoriteProvider(user.id, favoriteProviderId)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  userCreateFavoriteProvider(@CtxUser() user: User, @Args('input') input: UserCreateFavoriteProviderInput,) {
    return this.service.userCreateFavoriteProvider(user.id, input)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  userUpdateFavoriteProvider(
    @CtxUser() user: User,
    @Args('favoriteProviderId') favoriteProviderId: string,
    @Args('input') input: UserUpdateFavoriteProviderInput,
  ) {
    return this.service.userUpdateFavoriteProvider(user.id, favoriteProviderId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateFavoriteProviders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateFavoriteProvidersInput,
  ) {
    return this.service.userUpdateFavoriteProviders(user.id, input)
  }

  @Mutation(() => FavoriteProvider, { nullable: true })
  userDeleteFavoriteProvider(@CtxUser() user: User, @Args('favoriteProviderId') favoriteProviderId: string) {
    return this.service.userDeleteFavoriteProvider(user.id, favoriteProviderId)
  }
}

