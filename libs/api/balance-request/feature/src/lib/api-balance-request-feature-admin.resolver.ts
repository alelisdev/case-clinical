
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreateBalanceRequestInput,
  AdminListBalanceRequestInput,
  AdminUpdateBalanceRequestInput,
  ApiBalanceRequestDataAccessAdminService,
  BalanceRequest
} from '@case-clinical/api/balance-request/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListDocumentInput, Document } from '@case-clinical/api/document/data-access'
import { AdminListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiBalanceRequestFeatureAdminResolver {
  constructor(private readonly service: ApiBalanceRequestDataAccessAdminService) {}

  @Query(() => [BalanceRequest], { nullable: true })
  adminBalanceRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBalanceRequestInput, nullable: true }) input?: AdminListBalanceRequestInput,
  ) {
    return this.service.adminBalanceRequests(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountBalanceRequests(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListBalanceRequestInput, nullable: true }) input?: AdminListBalanceRequestInput,
  ) {
    return this.service.adminCountBalanceRequests(admin.id, input)
  }





  @Query(() => BalanceRequest, { nullable: true })
  adminBalanceRequest(@CtxUser() admin: User, @Args('balanceRequestId') balanceRequestId: string) {
    return this.service.adminBalanceRequest(admin.id, balanceRequestId)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  adminCreateBalanceRequest(@CtxUser() admin: User, @Args('input') input: AdminCreateBalanceRequestInput,) {
    return this.service.adminCreateBalanceRequest(admin.id, input)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  adminUpdateBalanceRequest(
    @CtxUser() admin: User,
    @Args('balanceRequestId') balanceRequestId: string,
    @Args('input') input: AdminUpdateBalanceRequestInput,
  ) {
    return this.service.adminUpdateBalanceRequest(admin.id, balanceRequestId, input)
  }

  @Mutation(() => BalanceRequest, { nullable: true })
  adminDeleteBalanceRequest(@CtxUser() admin: User, @Args('balanceRequestId') balanceRequestId: string) {
    return this.service.adminDeleteBalanceRequest(admin.id, balanceRequestId)
  }
}

