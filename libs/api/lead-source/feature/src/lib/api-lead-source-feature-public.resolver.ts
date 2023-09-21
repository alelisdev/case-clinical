
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadSourceInput,
  ApiLeadSourceDataAccessPublicService,
  LeadSource,
} from '@case-clinical/api/lead-source/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadSourceFeaturePublicResolver {
  constructor(private readonly service: ApiLeadSourceDataAccessPublicService) {}
           
  @Query(() => [LeadSource], { nullable: true })
  publicLeadSources(
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.publicLeadSources(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeadSources(
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.publicCountLeadSources(input)
  }

  @Query(() => [LeadSource], { nullable: true })
  publicSelectLeadSources(
    @Args({ name: 'input', type: () => UserListLeadSourceInput, nullable: true }) input?: UserListLeadSourceInput,
  ) {
    return this.service.publicSelectLeadSources(input)
  }

  @Query(() => LeadSource, { nullable: true })
  publicLeadSource(@Args('leadSourceId') leadSourceId: string) {
    return this.service.publicLeadSource(leadSourceId)
  }
}
