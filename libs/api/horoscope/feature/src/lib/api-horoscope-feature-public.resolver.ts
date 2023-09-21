
import { Args, Query, Resolver } from '@nestjs/graphql'
import {  ApiHoroscopeDataAccessPublicService, Horoscope, HoroscopeInput } from '@case-clinical/api/horoscope/data-access'

@Resolver()
export class ApiHoroscopeFeaturePublicResolver {
  constructor(private readonly service: ApiHoroscopeDataAccessPublicService) {}

  @Query(() => Horoscope, { nullable: true })
  publicHoroscope(
    @Args({ name: 'input', type: () => HoroscopeInput, nullable: true }) input?: HoroscopeInput,
  ) {
    return this.service.publicHoroscope(input)
  }
}
