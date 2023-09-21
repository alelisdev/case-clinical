
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateInjuryInput,
  UserListInjuryInput,
  UserUpdateInjuryInput,
  UserUpdateInjuriesInput,
  ApiInjuryDataAccessUserService,
  Injury,
} from '@case-clinical/api/injury/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiInjuryFeatureUserResolver {
  constructor(private readonly service: ApiInjuryDataAccessUserService) {}

  @Query(() => [Injury], { nullable: true })
  userInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.userInjuries(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.userCountInjuries(user.id, input)
  }

  @Query(() => [Injury], { nullable: true })
  userSelectInjuries(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListInjuryInput, nullable: true }) input?: UserListInjuryInput,
  ) {
    return this.service.userSelectInjuries(user.id, input)
  }







  @Query(() => Injury, { nullable: true })
  userInjury(@CtxUser() user: User, @Args('injuryId') injuryId: string) {
    return this.service.userInjury(user.id, injuryId)
  }

  @Mutation(() => Injury, { nullable: true })
  userCreateInjury(@CtxUser() user: User, @Args('input') input: UserCreateInjuryInput,) {
    return this.service.userCreateInjury(user.id, input)
  }

  @Mutation(() => Injury, { nullable: true })
  userUpdateInjury(
    @CtxUser() user: User,
    @Args('injuryId') injuryId: string,
    @Args('input') input: UserUpdateInjuryInput,
  ) {
    return this.service.userUpdateInjury(user.id, injuryId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateInjuries(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateInjuriesInput,
  ) {
    return this.service.userUpdateInjuries(user.id, input)
  }

  @Mutation(() => Injury, { nullable: true })
  userDeleteInjury(@CtxUser() user: User, @Args('injuryId') injuryId: string) {
    return this.service.userDeleteInjury(user.id, injuryId)
  }
}

