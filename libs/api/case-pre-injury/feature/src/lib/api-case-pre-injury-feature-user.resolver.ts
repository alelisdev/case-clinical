
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateCasePreInjuryInput,
  UserListCasePreInjuryInput,
  UserUpdateCasePreInjuryInput,
  UserUpdateCasePreInjuriesInput,
  ApiCasePreInjuryDataAccessUserService,
  CasePreInjury,
} from '@case-clinical/api/case-pre-injury/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLegalCaseInput, LegalCase } from '@case-clinical/api/legal-case/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiCasePreInjuryFeatureUserResolver {
  constructor(private readonly service: ApiCasePreInjuryDataAccessUserService) {}

  @Query(() => [CasePreInjury], { nullable: true })
  userCasePreInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.userCasePreInjuries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountCasePreInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.userCountCasePreInjuries(user.id, input)
  }

  @Query(() => [CasePreInjury], { nullable: true })
  userSelectCasePreInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListCasePreInjuryInput, nullable: true }) input?: UserListCasePreInjuryInput,
  ) {
    return this.service.userSelectCasePreInjuries(user.id, input)
  }







  @Query(() => CasePreInjury, { nullable: true })
  userCasePreInjury(@CtxUser() user: User, @Args('casePreInjuryId') casePreInjuryId: string) {
    return this.service.userCasePreInjury(user.id, casePreInjuryId)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  userCreateCasePreInjury(@CtxUser() user: User, @Args('input') input: UserCreateCasePreInjuryInput,) {
    return this.service.userCreateCasePreInjury(user.id, input)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  userUpdateCasePreInjury(
    @CtxUser() user: User,
    @Args('casePreInjuryId') casePreInjuryId: string,
    @Args('input') input: UserUpdateCasePreInjuryInput,
  ) {
    return this.service.userUpdateCasePreInjury(user.id, casePreInjuryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateCasePreInjuries(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateCasePreInjuriesInput,
  ) {
    return this.service.userUpdateCasePreInjuries(user.id, input)
  }

  @Mutation(() => CasePreInjury, { nullable: true })
  userDeleteCasePreInjury(@CtxUser() user: User, @Args('casePreInjuryId') casePreInjuryId: string) {
    return this.service.userDeleteCasePreInjury(user.id, casePreInjuryId)
  }
}

