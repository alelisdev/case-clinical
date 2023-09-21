
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePchProviderInput,
  UserListPchProviderInput,
  UserUpdatePchProviderInput,
  UserUpdatePchProvidersInput,
  ApiPchProviderDataAccessUserService,
  PchProvider,
} from '@case-clinical/api/pch-provider/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPchProviderFeatureUserResolver {
  constructor(private readonly service: ApiPchProviderDataAccessUserService) {}

  @Query(() => [PchProvider], { nullable: true })
  userPchProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.userPchProviders(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPchProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.userCountPchProviders(user.id, input)
  }

  @Query(() => [PchProvider], { nullable: true })
  userSelectPchProviders(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPchProviderInput, nullable: true }) input?: UserListPchProviderInput,
  ) {
    return this.service.userSelectPchProviders(user.id, input)
  }







  @Query(() => PchProvider, { nullable: true })
  userPchProvider(@CtxUser() user: User, @Args('pchProviderId') pchProviderId: string) {
    return this.service.userPchProvider(user.id, pchProviderId)
  }

  @Mutation(() => PchProvider, { nullable: true })
  userCreatePchProvider(@CtxUser() user: User, @Args('input') input: UserCreatePchProviderInput,) {
    return this.service.userCreatePchProvider(user.id, input)
  }

  @Mutation(() => PchProvider, { nullable: true })
  userUpdatePchProvider(
    @CtxUser() user: User,
    @Args('pchProviderId') pchProviderId: string,
    @Args('input') input: UserUpdatePchProviderInput,
  ) {
    return this.service.userUpdatePchProvider(user.id, pchProviderId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePchProviders(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePchProvidersInput,
  ) {
    return this.service.userUpdatePchProviders(user.id, input)
  }

  @Mutation(() => PchProvider, { nullable: true })
  userDeletePchProvider(@CtxUser() user: User, @Args('pchProviderId') pchProviderId: string) {
    return this.service.userDeletePchProvider(user.id, pchProviderId)
  }
}

