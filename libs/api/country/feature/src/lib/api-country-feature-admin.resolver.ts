
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateCountryInput,
  AdminListCountryInput,
  AdminUpdateCountryInput,
  ApiCountryDataAccessAdminService,
  Country
} from '@case-clinical/api/country/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiCountryFeatureAdminResolver {
  constructor(private readonly service: ApiCountryDataAccessAdminService) {}

  @Query(() => [Country], { nullable: true })
  adminCountries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCountryInput, nullable: true }) input?: AdminListCountryInput,
  ) {
    return this.service.adminCountries(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountCountries(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListCountryInput, nullable: true }) input?: AdminListCountryInput,
  ) {
    return this.service.adminCountCountries(admin.id, input)
  }





  @Query(() => Country, { nullable: true })
  adminCountry(@CtxUser() admin: User, @Args('countryId') countryId: string) {
    return this.service.adminCountry(admin.id, countryId)
  }

  @Mutation(() => Country, { nullable: true })
  adminCreateCountry(@CtxUser() admin: User, @Args('input') input: AdminCreateCountryInput,) {
    return this.service.adminCreateCountry(admin.id, input)
  }

  @Mutation(() => Country, { nullable: true })
  adminUpdateCountry(
    @CtxUser() admin: User,
    @Args('countryId') countryId: string,
    @Args('input') input: AdminUpdateCountryInput,
  ) {
    return this.service.adminUpdateCountry(admin.id, countryId, input)
  }

  @Mutation(() => Country, { nullable: true })
  adminDeleteCountry(@CtxUser() admin: User, @Args('countryId') countryId: string) {
    return this.service.adminDeleteCountry(admin.id, countryId)
  }
}

