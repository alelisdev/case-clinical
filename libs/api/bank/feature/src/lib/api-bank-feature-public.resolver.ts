
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBankInput,
  ApiBankDataAccessPublicService,
  Bank,
} from '@case-clinical/api/bank/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiBankFeaturePublicResolver {
  constructor(private readonly service: ApiBankDataAccessPublicService) {}
           
  @Query(() => [Bank], { nullable: true })
  publicBanks(
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.publicBanks(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBanks(
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.publicCountBanks(input)
  }

  @Query(() => [Bank], { nullable: true })
  publicSelectBanks(
    @Args({ name: 'input', type: () => UserListBankInput, nullable: true }) input?: UserListBankInput,
  ) {
    return this.service.publicSelectBanks(input)
  }

  @Query(() => Bank, { nullable: true })
  publicBank(@Args('bankId') bankId: string) {
    return this.service.publicBank(bankId)
  }
}
