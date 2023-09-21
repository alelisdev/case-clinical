
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListRequestAdditionalVisitInput,
  ApiRequestAdditionalVisitDataAccessPublicService,
  RequestAdditionalVisit,
} from '@case-clinical/api/request-additional-visit/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiRequestAdditionalVisitFeaturePublicResolver {
  constructor(private readonly service: ApiRequestAdditionalVisitDataAccessPublicService) {}
           
  @Query(() => [RequestAdditionalVisit], { nullable: true })
  publicRequestAdditionalVisits(
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.publicRequestAdditionalVisits(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountRequestAdditionalVisits(
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.publicCountRequestAdditionalVisits(input)
  }

  @Query(() => [RequestAdditionalVisit], { nullable: true })
  publicSelectRequestAdditionalVisits(
    @Args({ name: 'input', type: () => UserListRequestAdditionalVisitInput, nullable: true }) input?: UserListRequestAdditionalVisitInput,
  ) {
    return this.service.publicSelectRequestAdditionalVisits(input)
  }

  @Query(() => RequestAdditionalVisit, { nullable: true })
  publicRequestAdditionalVisit(@Args('requestAdditionalVisitId') requestAdditionalVisitId: string) {
    return this.service.publicRequestAdditionalVisit(requestAdditionalVisitId)
  }
}
