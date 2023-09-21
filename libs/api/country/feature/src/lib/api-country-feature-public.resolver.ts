
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCountryInput,
  ApiCountryDataAccessPublicService,
  Country,
} from '@case-clinical/api/country/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCountryFeaturePublicResolver {
  constructor(private readonly service: ApiCountryDataAccessPublicService) {}
           
  @Query(() => [Country], { nullable: true })
  publicCountries(
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.publicCountries(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCountries(
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.publicCountCountries(input)
  }

  @Query(() => [Country], { nullable: true })
  publicSelectCountries(
    @Args({ name: 'input', type: () => UserListCountryInput, nullable: true }) input?: UserListCountryInput,
  ) {
    return this.service.publicSelectCountries(input)
  }

  @Query(() => Country, { nullable: true })
  publicCountry(@Args('countryId') countryId: string) {
    return this.service.publicCountry(countryId)
  }
}
