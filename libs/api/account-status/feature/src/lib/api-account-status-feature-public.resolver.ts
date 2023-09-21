
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListAccountStatusInput,
  ApiAccountStatusDataAccessPublicService,
  AccountStatus,
} from '@case-clinical/api/account-status/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiAccountStatusFeaturePublicResolver {
  constructor(private readonly service: ApiAccountStatusDataAccessPublicService) {}
           
  @Query(() => [AccountStatus], { nullable: true })
  publicAccountStatuses(
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.publicAccountStatuses(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountAccountStatuses(
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.publicCountAccountStatuses(input)
  }

  @Query(() => [AccountStatus], { nullable: true })
  publicSelectAccountStatuses(
    @Args({ name: 'input', type: () => UserListAccountStatusInput, nullable: true }) input?: UserListAccountStatusInput,
  ) {
    return this.service.publicSelectAccountStatuses(input)
  }

  @Query(() => AccountStatus, { nullable: true })
  publicAccountStatus(@Args('accountStatusId') accountStatusId: string) {
    return this.service.publicAccountStatus(accountStatusId)
  }
}
