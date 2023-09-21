
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  AdminCreatePriorAuthorizationProcedureCodeInput,
  AdminListPriorAuthorizationProcedureCodeInput,
  AdminUpdatePriorAuthorizationProcedureCodeInput,
  ApiPriorAuthorizationProcedureCodeDataAccessAdminService,
  PriorAuthorizationProcedureCode
} from '@case-clinical/api/prior-authorization-procedure-code/data-access'
import { User } from '@case-clinical/api/user/data-access'

import { AdminListCostCategoryInput, CostCategory } from '@case-clinical/api/cost-category/data-access'
import { AdminListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'
import { AdminListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'

import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser, GqlAuthAdminGuard,
} from '@case-clinical/api/auth/util'


@Resolver()
@UseGuards(GqlAuthAdminGuard)
export class ApiPriorAuthorizationProcedureCodeFeatureAdminResolver {
  constructor(private readonly service: ApiPriorAuthorizationProcedureCodeDataAccessAdminService) {}

  @Query(() => [PriorAuthorizationProcedureCode], { nullable: true })
  adminPriorAuthorizationProcedureCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: AdminListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.adminPriorAuthorizationProcedureCodes(admin.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  adminCountPriorAuthorizationProcedureCodes(
    @CtxUser() admin: User,
    @Args({ name: 'input', type: () => AdminListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: AdminListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.adminCountPriorAuthorizationProcedureCodes(admin.id, input)
  }





  @Query(() => PriorAuthorizationProcedureCode, { nullable: true })
  adminPriorAuthorizationProcedureCode(@CtxUser() admin: User, @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string) {
    return this.service.adminPriorAuthorizationProcedureCode(admin.id, priorAuthorizationProcedureCodeId)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  adminCreatePriorAuthorizationProcedureCode(@CtxUser() admin: User, @Args('input') input: AdminCreatePriorAuthorizationProcedureCodeInput,) {
    return this.service.adminCreatePriorAuthorizationProcedureCode(admin.id, input)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  adminUpdatePriorAuthorizationProcedureCode(
    @CtxUser() admin: User,
    @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string,
    @Args('input') input: AdminUpdatePriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.adminUpdatePriorAuthorizationProcedureCode(admin.id, priorAuthorizationProcedureCodeId, input)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  adminDeletePriorAuthorizationProcedureCode(@CtxUser() admin: User, @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string) {
    return this.service.adminDeletePriorAuthorizationProcedureCode(admin.id, priorAuthorizationProcedureCodeId)
  }
}

