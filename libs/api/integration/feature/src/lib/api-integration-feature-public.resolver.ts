
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListIntegrationInput,
  ApiIntegrationDataAccessPublicService,
  Integration,
} from '@case-clinical/api/integration/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiIntegrationFeaturePublicResolver {
  constructor(private readonly service: ApiIntegrationDataAccessPublicService) {}
           
  @Query(() => [Integration], { nullable: true })
  publicIntegrations(
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.publicIntegrations(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountIntegrations(
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.publicCountIntegrations(input)
  }

  @Query(() => [Integration], { nullable: true })
  publicSelectIntegrations(
    @Args({ name: 'input', type: () => UserListIntegrationInput, nullable: true }) input?: UserListIntegrationInput,
  ) {
    return this.service.publicSelectIntegrations(input)
  }

  @Query(() => Integration, { nullable: true })
  publicIntegration(@Args('integrationId') integrationId: string) {
    return this.service.publicIntegration(integrationId)
  }
}
