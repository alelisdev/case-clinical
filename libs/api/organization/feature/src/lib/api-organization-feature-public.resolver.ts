
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListOrganizationInput,
  ApiOrganizationDataAccessPublicService,
  Organization,
} from '@case-clinical/api/organization/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiOrganizationFeaturePublicResolver {
  constructor(private readonly service: ApiOrganizationDataAccessPublicService) {}
           
  @Query(() => [Organization], { nullable: true })
  publicOrganizations(
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.publicOrganizations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountOrganizations(
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.publicCountOrganizations(input)
  }

  @Query(() => [Organization], { nullable: true })
  publicSelectOrganizations(
    @Args({ name: 'input', type: () => UserListOrganizationInput, nullable: true }) input?: UserListOrganizationInput,
  ) {
    return this.service.publicSelectOrganizations(input)
  }

  @Query(() => Organization, { nullable: true })
  publicOrganization(@Args('organizationId') organizationId: string) {
    return this.service.publicOrganization(organizationId)
  }
}
