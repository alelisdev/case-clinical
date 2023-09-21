
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateClinicalProviderInput,
  UserListClinicalProviderInput,
  UserUpdateClinicalProviderInput,
  UserUpdateClinicalProvidersInput,
  ApiClinicalProviderDataAccessUserService,
  ClinicalProvider,
} from '@case-clinical/api/clinical-provider/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListVendorInput, Vendor } from '@case-clinical/api/vendor/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiClinicalProviderFeatureUserResolver {
  constructor(private readonly service: ApiClinicalProviderDataAccessUserService) {}

  @Query(() => [ClinicalProvider], { nullable: true })
  userClinicalProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.userClinicalProviders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountClinicalProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.userCountClinicalProviders(user.id, input)
  }

  @Query(() => [ClinicalProvider], { nullable: true })
  userSelectClinicalProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListClinicalProviderInput, nullable: true }) input?: UserListClinicalProviderInput,
  ) {
    return this.service.userSelectClinicalProviders(user.id, input)
  }







  @Query(() => ClinicalProvider, { nullable: true })
  userClinicalProvider(@CtxUser() user: User, @Args('clinicalProviderId') clinicalProviderId: string) {
    return this.service.userClinicalProvider(user.id, clinicalProviderId)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  userCreateClinicalProvider(@CtxUser() user: User, @Args('input') input: UserCreateClinicalProviderInput,) {
    return this.service.userCreateClinicalProvider(user.id, input)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  userUpdateClinicalProvider(
    @CtxUser() user: User,
    @Args('clinicalProviderId') clinicalProviderId: string,
    @Args('input') input: UserUpdateClinicalProviderInput,
  ) {
    return this.service.userUpdateClinicalProvider(user.id, clinicalProviderId, input)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  userAddToFavorites(
    @CtxUser() user: User,
    @Args('clinicalProviderId') clinicalProviderId: string,
  ) {
    return this.service.userAddToFavorites(user.id, clinicalProviderId)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  userRemoveFromFavorites(
    @CtxUser() user: User,
    @Args('clinicalProviderId') clinicalProviderId: string,
  ) {
    return this.service.userRemoveFromFavorites(user.id, clinicalProviderId)
  }


  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateClinicalProviders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateClinicalProvidersInput,
  ) {
    return this.service.userUpdateClinicalProviders(user.id, input)
  }

  @Mutation(() => ClinicalProvider, { nullable: true })
  userDeleteClinicalProvider(@CtxUser() user: User, @Args('clinicalProviderId') clinicalProviderId: string) {
    return this.service.userDeleteClinicalProvider(user.id, clinicalProviderId)
  }
}

