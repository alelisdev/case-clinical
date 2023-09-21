
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateContractTermInput,
  AdminListContractTermInput,
  AdminUpdateContractTermInput,
  ApiContractTermDataAccessAdminService,
  ContractTerm
} from '@case-clinical/api/contract-term/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListContractInput, Contract } from '@case-clinical/api/contract/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiContractTermFeatureAdminResolver {
  constructor(private readonly service: ApiContractTermDataAccessAdminService) {}

  @Query(() => [ContractTerm], { nullable: true })
  adminContractTerms(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractTermInput, nullable: true }) input?: AdminListContractTermInput,
  ) {
    return this.service.adminContractTerms(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountContractTerms(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListContractTermInput, nullable: true }) input?: AdminListContractTermInput,
  ) {
    return this.service.adminCountContractTerms(admin.id, input)
  }





  @Query(() => ContractTerm, { nullable: true })
  adminContractTerm(@CtxUser() admin: User, @Args('contractTermId') contractTermId: string) {
    return this.service.adminContractTerm(admin.id, contractTermId)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  adminCreateContractTerm(@CtxUser() admin: User, @Args('input') input: AdminCreateContractTermInput,) {
    return this.service.adminCreateContractTerm(admin.id, input)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  adminUpdateContractTerm(
    @CtxUser() admin: User,
    @Args('contractTermId') contractTermId: string,
    @Args('input') input: AdminUpdateContractTermInput,
  ) {
    return this.service.adminUpdateContractTerm(admin.id, contractTermId, input)
  }

  @Mutation(() => ContractTerm, { nullable: true })
  adminDeleteContractTerm(@CtxUser() admin: User, @Args('contractTermId') contractTermId: string) {
    return this.service.adminDeleteContractTerm(admin.id, contractTermId)
  }
}

