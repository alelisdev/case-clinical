
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListSeverityInput,
  ApiSeverityDataAccessPublicService,
  Severity,
} from '@case-clinical/api/severity/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiSeverityFeaturePublicResolver {
  constructor(private readonly service: ApiSeverityDataAccessPublicService) {}
           
  @Query(() => [Severity], { nullable: true })
  publicSeverities(
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.publicSeverities(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountSeverities(
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.publicCountSeverities(input)
  }

  @Query(() => [Severity], { nullable: true })
  publicSelectSeverities(
    @Args({ name: 'input', type: () => UserListSeverityInput, nullable: true }) input?: UserListSeverityInput,
  ) {
    return this.service.publicSelectSeverities(input)
  }

  @Query(() => Severity, { nullable: true })
  publicSeverity(@Args('severityId') severityId: string) {
    return this.service.publicSeverity(severityId)
  }
}
