
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCasePreProcedureInput,
  UserListCasePreProcedureInput,
  UserUpdateCasePreProcedureInput,
  UserUpdateCasePreProceduresInput,
  ApiCasePreProcedureDataAccessUserService,
  CasePreProcedure,
} from '@case-clinical/api/case-pre-procedure/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCasePreProcedureFeatureUserResolver {
  constructor(private readonly service: ApiCasePreProcedureDataAccessUserService) {}

  @Query(() => [CasePreProcedure], { nullable: true })
  userCasePreProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.userCasePreProcedures(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCasePreProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.userCountCasePreProcedures(user.id, input)
  }

  @Query(() => [CasePreProcedure], { nullable: true })
  userSelectCasePreProcedures(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreProcedureInput, nullable: true }) input?: UserListCasePreProcedureInput,
  ) {
    return this.service.userSelectCasePreProcedures(user.id, input)
  }







  @Query(() => CasePreProcedure, { nullable: true })
  userCasePreProcedure(@CtxUser() user: User, @Args('casePreProcedureId') casePreProcedureId: string) {
    return this.service.userCasePreProcedure(user.id, casePreProcedureId)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  userCreateCasePreProcedure(@CtxUser() user: User, @Args('input') input: UserCreateCasePreProcedureInput,) {
    return this.service.userCreateCasePreProcedure(user.id, input)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  userUpdateCasePreProcedure(
    @CtxUser() user: User,
    @Args('casePreProcedureId') casePreProcedureId: string,
    @Args('input') input: UserUpdateCasePreProcedureInput,
  ) {
    return this.service.userUpdateCasePreProcedure(user.id, casePreProcedureId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCasePreProcedures(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCasePreProceduresInput,
  ) {
    return this.service.userUpdateCasePreProcedures(user.id, input)
  }

  @Mutation(() => CasePreProcedure, { nullable: true })
  userDeleteCasePreProcedure(@CtxUser() user: User, @Args('casePreProcedureId') casePreProcedureId: string) {
    return this.service.userDeleteCasePreProcedure(user.id, casePreProcedureId)
  }
}

