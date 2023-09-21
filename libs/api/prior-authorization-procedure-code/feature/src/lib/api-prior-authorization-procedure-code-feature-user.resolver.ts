
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreatePriorAuthorizationProcedureCodeInput,
  UserListPriorAuthorizationProcedureCodeInput,
  UserUpdatePriorAuthorizationProcedureCodeInput,
  UserUpdatePriorAuthorizationProcedureCodesInput,
  ApiPriorAuthorizationProcedureCodeDataAccessUserService,
  PriorAuthorizationProcedureCode,
} from '@case-clinical/api/prior-authorization-procedure-code/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListCostCategoryInput, CostCategory } from '@case-clinical/api/cost-category/data-access'
import { UserListProcedureInput, Procedure } from '@case-clinical/api/procedure/data-access'
import { UserListPriorAuthorizationRequestInput, PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiPriorAuthorizationProcedureCodeFeatureUserResolver {
  constructor(private readonly service: ApiPriorAuthorizationProcedureCodeDataAccessUserService) {}

  @Query(() => [PriorAuthorizationProcedureCode], { nullable: true })
  userPriorAuthorizationProcedureCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.userPriorAuthorizationProcedureCodes(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountPriorAuthorizationProcedureCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.userCountPriorAuthorizationProcedureCodes(user.id, input)
  }

  @Query(() => [PriorAuthorizationProcedureCode], { nullable: true })
  userSelectPriorAuthorizationProcedureCodes(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListPriorAuthorizationProcedureCodeInput, nullable: true }) input?: UserListPriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.userSelectPriorAuthorizationProcedureCodes(user.id, input)
  }







  @Query(() => PriorAuthorizationProcedureCode, { nullable: true })
  userPriorAuthorizationProcedureCode(@CtxUser() user: User, @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string) {
    return this.service.userPriorAuthorizationProcedureCode(user.id, priorAuthorizationProcedureCodeId)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  userCreatePriorAuthorizationProcedureCode(@CtxUser() user: User, @Args('input') input: UserCreatePriorAuthorizationProcedureCodeInput,) {
    return this.service.userCreatePriorAuthorizationProcedureCode(user.id, input)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  userUpdatePriorAuthorizationProcedureCode(
    @CtxUser() user: User,
    @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string,
    @Args('input') input: UserUpdatePriorAuthorizationProcedureCodeInput,
  ) {
    return this.service.userUpdatePriorAuthorizationProcedureCode(user.id, priorAuthorizationProcedureCodeId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdatePriorAuthorizationProcedureCodes(
    @CtxUser() user: User,
    @Args('input') input: UserUpdatePriorAuthorizationProcedureCodesInput,
  ) {
    return this.service.userUpdatePriorAuthorizationProcedureCodes(user.id, input)
  }

  @Mutation(() => PriorAuthorizationProcedureCode, { nullable: true })
  userDeletePriorAuthorizationProcedureCode(@CtxUser() user: User, @Args('priorAuthorizationProcedureCodeId') priorAuthorizationProcedureCodeId: string) {
    return this.service.userDeletePriorAuthorizationProcedureCode(user.id, priorAuthorizationProcedureCodeId)
  }
}

