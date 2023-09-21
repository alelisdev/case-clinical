
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadStatusInput,
  ApiLeadStatusDataAccessPublicService,
  LeadStatus,
} from '@case-clinical/api/lead-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadStatusFeaturePublicResolver {
  constructor(private readonly service: ApiLeadStatusDataAccessPublicService) {}
           
  @Query(() => [LeadStatus], { nullable: true })
  publicLeadStatuses(
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.publicLeadStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeadStatuses(
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.publicCountLeadStatuses(input)
  }

  @Query(() => [LeadStatus], { nullable: true })
  publicSelectLeadStatuses(
    @Args({ name: 'input', type: () => UserListLeadStatusInput, nullable: true }) input?: UserListLeadStatusInput,
  ) {
    return this.service.publicSelectLeadStatuses(input)
  }

  @Query(() => LeadStatus, { nullable: true })
  publicLeadStatus(@Args('leadStatusId') leadStatusId: string) {
    return this.service.publicLeadStatus(leadStatusId)
  }
}
