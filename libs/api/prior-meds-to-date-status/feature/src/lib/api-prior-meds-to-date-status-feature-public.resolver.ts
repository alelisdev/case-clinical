
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListPriorMedsToDateStatusInput,
  ApiPriorMedsToDateStatusDataAccessPublicService,
  PriorMedsToDateStatus,
} from '@case-clinical/api/prior-meds-to-date-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPriorMedsToDateStatusFeaturePublicResolver {
  constructor(private readonly service: ApiPriorMedsToDateStatusDataAccessPublicService) {}
           
  @Query(() => [PriorMedsToDateStatus], { nullable: true })
  publicPriorMedsToDateStatuses(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.publicPriorMedsToDateStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountPriorMedsToDateStatuses(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.publicCountPriorMedsToDateStatuses(input)
  }

  @Query(() => [PriorMedsToDateStatus], { nullable: true })
  publicSelectPriorMedsToDateStatuses(
    @Args({ name: 'input', type: () => UserListPriorMedsToDateStatusInput, nullable: true }) input?: UserListPriorMedsToDateStatusInput,
  ) {
    return this.service.publicSelectPriorMedsToDateStatuses(input)
  }

  @Query(() => PriorMedsToDateStatus, { nullable: true })
  publicPriorMedsToDateStatus(@Args('priorMedsToDateStatusId') priorMedsToDateStatusId: string) {
    return this.service.publicPriorMedsToDateStatus(priorMedsToDateStatusId)
  }
}
