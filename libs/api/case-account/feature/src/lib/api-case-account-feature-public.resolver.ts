
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListCaseAccountInput,
  ApiCaseAccountDataAccessPublicService,
  CaseAccount,
} from '@case-clinical/api/case-account/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiCaseAccountFeaturePublicResolver {
  constructor(private readonly service: ApiCaseAccountDataAccessPublicService) {}
           
  @Query(() => [CaseAccount], { nullable: true })
  publicCaseAccounts(
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.publicCaseAccounts(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountCaseAccounts(
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.publicCountCaseAccounts(input)
  }

  @Query(() => [CaseAccount], { nullable: true })
  publicSelectCaseAccounts(
    @Args({ name: 'input', type: () => UserListCaseAccountInput, nullable: true }) input?: UserListCaseAccountInput,
  ) {
    return this.service.publicSelectCaseAccounts(input)
  }

  @Query(() => CaseAccount, { nullable: true })
  publicCaseAccount(@Args('caseAccountId') caseAccountId: string) {
    return this.service.publicCaseAccount(caseAccountId)
  }
}
