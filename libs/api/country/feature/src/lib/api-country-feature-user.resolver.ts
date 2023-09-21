
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCountryInput,
  UserListCountryInput,
  UserUpdateCountryInput,
  UserUpdateCountriesInput,
  ApiCountryDataAccessUserService,
  Country,
} from '@case-clinical/api/country/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCountryFeatureUserResolver {
  constructor(private readonly service: ApiCountryDataAccessUserService) {}

  @Query(() => [Country], { nullable: true })
  userCountries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.userCountries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCountries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.userCountCountries(user.id, input)
  }

  @Query(() => [Country], { nullable: true })
  userSelectCountries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.userSelectCountries(user.id, input)
  }







  @Query(() => Country, { nullable: true })
  userCountry(@CtxUser() user: User, @Args('countryId') countryId: string) {
    return this.service.userCountry(user.id, countryId)
  }

  @Mutation(() => Country, { nullable: true })
  userCreateCountry(@CtxUser() user: User, @Args('input') input: UserCreateCountryInput,) {
    return this.service.userCreateCountry(user.id, input)
  }

  @Mutation(() => Country, { nullable: true })
  userUpdateCountry(
    @CtxUser() user: User,
    @Args('countryId') countryId: string,
    @Args('input') input: UserUpdateCountryInput,
  ) {
    return this.service.userUpdateCountry(user.id, countryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCountries(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCountriesInput,
  ) {
    return this.service.userUpdateCountries(user.id, input)
  }

  @Mutation(() => Country, { nullable: true })
  userDeleteCountry(@CtxUser() user: User, @Args('countryId') countryId: string) {
    return this.service.userDeleteCountry(user.id, countryId)
  }
}

