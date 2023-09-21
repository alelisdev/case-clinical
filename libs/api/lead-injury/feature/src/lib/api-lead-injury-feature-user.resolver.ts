
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateLeadInjuryInput,
  UserListLeadInjuryInput,
  UserUpdateLeadInjuryInput,
  UserUpdateLeadInjuriesInput,
  ApiLeadInjuryDataAccessUserService,
  LeadInjury,
} from '@case-clinical/api/lead-injury/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListLeadInput, Lead } from '@case-clinical/api/lead/data-access'
import { UserListSeverityInput, Severity } from '@case-clinical/api/severity/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiLeadInjuryFeatureUserResolver {
  constructor(private readonly service: ApiLeadInjuryDataAccessUserService) {}

  @Query(() => [LeadInjury], { nullable: true })
  userLeadInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.userLeadInjuries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountLeadInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.userCountLeadInjuries(user.id, input)
  }

  @Query(() => [LeadInjury], { nullable: true })
  userSelectLeadInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListLeadInjuryInput, nullable: true }) input?: UserListLeadInjuryInput,
  ) {
    return this.service.userSelectLeadInjuries(user.id, input)
  }







  @Query(() => LeadInjury, { nullable: true })
  userLeadInjury(@CtxUser() user: User, @Args('leadInjuryId') leadInjuryId: string) {
    return this.service.userLeadInjury(user.id, leadInjuryId)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  userCreateLeadInjury(@CtxUser() user: User, @Args('input') input: UserCreateLeadInjuryInput,) {
    return this.service.userCreateLeadInjury(user.id, input)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  userUpdateLeadInjury(
    @CtxUser() user: User,
    @Args('leadInjuryId') leadInjuryId: string,
    @Args('input') input: UserUpdateLeadInjuryInput,
  ) {
    return this.service.userUpdateLeadInjury(user.id, leadInjuryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateLeadInjuries(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateLeadInjuriesInput,
  ) {
    return this.service.userUpdateLeadInjuries(user.id, input)
  }

  @Mutation(() => LeadInjury, { nullable: true })
  userDeleteLeadInjury(@CtxUser() user: User, @Args('leadInjuryId') leadInjuryId: string) {
    return this.service.userDeleteLeadInjury(user.id, leadInjuryId)
  }
}

