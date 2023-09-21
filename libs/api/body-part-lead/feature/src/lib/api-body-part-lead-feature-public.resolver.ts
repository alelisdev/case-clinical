
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBodyPartLeadInput,
  ApiBodyPartLeadDataAccessPublicService,
  BodyPartLead,
} from '@case-clinical/api/body-part-lead/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiBodyPartLeadFeaturePublicResolver {
  constructor(private readonly service: ApiBodyPartLeadDataAccessPublicService) {}
           
  @Query(() => [BodyPartLead], { nullable: true })
  publicBodyPartLeads(
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.publicBodyPartLeads(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBodyPartLeads(
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.publicCountBodyPartLeads(input)
  }

  @Query(() => [BodyPartLead], { nullable: true })
  publicSelectBodyPartLeads(
    @Args({ name: 'input', type: () => UserListBodyPartLeadInput, nullable: true }) input?: UserListBodyPartLeadInput,
  ) {
    return this.service.publicSelectBodyPartLeads(input)
  }

  @Query(() => BodyPartLead, { nullable: true })
  publicBodyPartLead(@Args('bodyPartLeadId') bodyPartLeadId: string) {
    return this.service.publicBodyPartLead(bodyPartLeadId)
  }
}
