
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListLeadInjuryInput,
  ApiLeadInjuryDataAccessPublicService,
  LeadInjury,
} from '@case-clinical/api/lead-injury/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiLeadInjuryFeaturePublicResolver {
  constructor(private readonly service: ApiLeadInjuryDataAccessPublicService) {}
           
  @Query(() => [LeadInjury], { nullable: true })
  publicLeadInjuries(
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.publicLeadInjuries(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountLeadInjuries(
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.publicCountLeadInjuries(input)
  }

  @Query(() => [LeadInjury], { nullable: true })
  publicSelectLeadInjuries(
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.publicSelectLeadInjuries(input)
  }

  @Query(() => LeadInjury, { nullable: true })
  publicLeadInjury(@Args('leadInjuryId') leadInjuryId: string) {
    return this.service.publicLeadInjury(leadInjuryId)
  }
}
