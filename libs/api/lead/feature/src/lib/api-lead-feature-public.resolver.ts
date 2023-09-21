
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadInput,
  ApiLeadDataAccessPublicService,
  Lead,
} from '@case-clinical/api/lead/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadFeaturePublicResolver {
  constructor(private readonly service: ApiLeadDataAccessPublicService) {}
           
  @Query(() => [Lead], { nullable: true })
  publicLeads(
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.publicLeads(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeads(
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.publicCountLeads(input)
  }

  @Query(() => [Lead], { nullable: true })
  publicSelectLeads(
    @Args({ name: 'input', type: () => UserListLeadInput, nullable: true }) input?: UserListLeadInput,
  ) {
    return this.service.publicSelectLeads(input)
  }

  @Query(() => Lead, { nullable: true })
  publicLead(@Args('leadId') leadId: string) {
    return this.service.publicLead(leadId)
  }
}
