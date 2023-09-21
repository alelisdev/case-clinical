
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadActionInput,
  ApiLeadActionDataAccessPublicService,
  LeadAction,
} from '@case-clinical/api/lead-action/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadActionFeaturePublicResolver {
  constructor(private readonly service: ApiLeadActionDataAccessPublicService) {}
           
  @Query(() => [LeadAction], { nullable: true })
  publicLeadActions(
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.publicLeadActions(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeadActions(
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.publicCountLeadActions(input)
  }

  @Query(() => [LeadAction], { nullable: true })
  publicSelectLeadActions(
    @Args({ name: 'input', type: () => UserListLeadActionInput, nullable: true }) input?: UserListLeadActionInput,
  ) {
    return this.service.publicSelectLeadActions(input)
  }

  @Query(() => LeadAction, { nullable: true })
  publicLeadAction(@Args('leadActionId') leadActionId: string) {
    return this.service.publicLeadAction(leadActionId)
  }
}
