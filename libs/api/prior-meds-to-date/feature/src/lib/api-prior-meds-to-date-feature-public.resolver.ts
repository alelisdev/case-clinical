
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorMedsToDateInput,
  ApiPriorMedsToDateDataAccessPublicService,
  PriorMedsToDate,
} from '@case-clinical/api/prior-meds-to-date/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorMedsToDateFeaturePublicResolver {
  constructor(private readonly service: ApiPriorMedsToDateDataAccessPublicService) {}
           
  @Query(() => [PriorMedsToDate], { nullable: true })
  publicPriorMedsToDates(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.publicPriorMedsToDates(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorMedsToDates(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.publicCountPriorMedsToDates(input)
  }

  @Query(() => [PriorMedsToDate], { nullable: true })
  publicSelectPriorMedsToDates(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateInput, nullable: true }) input?: UserListPriorMedsToDateInput,
  ) {
    return this.service.publicSelectPriorMedsToDates(input)
  }

  @Query(() => PriorMedsToDate, { nullable: true })
  publicPriorMedsToDate(@Args('priorMedsToDateId') priorMedsToDateId: string) {
    return this.service.publicPriorMedsToDate(priorMedsToDateId)
  }
}
