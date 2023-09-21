
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBankInput,
  AdminListBankInput,
  AdminUpdateBankInput,
  ApiBankDataAccessAdminService,
  Bank
} from '@case-clinical/api/bank/data-access'
import { User } from '@case-clinical/api/user/data-access'



import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiBankFeatureAdminResolver {
  constructor(private readonly service: ApiBankDataAccessAdminService) {}

  @Query(() => [Bank], { nullable: true })
  adminBanks(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBankInput, nullable: true }) input?: AdminListBankInput,
  ) {
    return this.service.adminBanks(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountBanks(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBankInput, nullable: true }) input?: AdminListBankInput,
  ) {
    return this.service.adminCountBanks(admin.id, input)
  }





  @Query(() => Bank, { nullable: true })
  adminBank(@CtxUser() admin: User, @Args('bankId') bankId: string) {
    return this.service.adminBank(admin.id, bankId)
  }

  @Mutation(() => Bank, { nullable: true })
  adminCreateBank(@CtxUser() admin: User, @Args('input') input: AdminCreateBankInput,) {
    return this.service.adminCreateBank(admin.id, input)
  }

  @Mutation(() => Bank, { nullable: true })
  adminUpdateBank(
    @CtxUser() admin: User,
    @Args('bankId') bankId: string,
    @Args('input') input: AdminUpdateBankInput,
  ) {
    return this.service.adminUpdateBank(admin.id, bankId, input)
  }

  @Mutation(() => Bank, { nullable: true })
  adminDeleteBank(@CtxUser() admin: User, @Args('bankId') bankId: string) {
    return this.service.adminDeleteBank(admin.id, bankId)
  }
}

