
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateAwardInput,
  UserListAwardInput,
  UserUpdateAwardInput,
  UserUpdateAwardsInput,
  ApiAwardDataAccessUserService,
  Award,
} from '@case-clinical/api/award/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

import { UserListClinicalProviderInput, ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'



@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAwardFeatureUserResolver {
  constructor(private readonly service: ApiAwardDataAccessUserService) {}

  @Query(() => [Award], { nullable: true })
  userAwards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.userAwards(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountAwards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.userCountAwards(user.id, input)
  }

  @Query(() => [Award], { nullable: true })
  userSelectAwards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListAwardInput, nullable: true }) input?: UserListAwardInput,
  ) {
    return this.service.userSelectAwards(user.id, input)
  }







  @Query(() => Award, { nullable: true })
  userAward(@CtxUser() user: User, @Args('awardId') awardId: string) {
    return this.service.userAward(user.id, awardId)
  }

  @Mutation(() => Award, { nullable: true })
  userCreateAward(@CtxUser() user: User, @Args('input') input: UserCreateAwardInput,) {
    return this.service.userCreateAward(user.id, input)
  }

  @Mutation(() => Award, { nullable: true })
  userUpdateAward(
    @CtxUser() user: User,
    @Args('awardId') awardId: string,
    @Args('input') input: UserUpdateAwardInput,
  ) {
    return this.service.userUpdateAward(user.id, awardId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateAwards(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateAwardsInput,
  ) {
    return this.service.userUpdateAwards(user.id, input)
  }

  @Mutation(() => Award, { nullable: true })
  userDeleteAward(@CtxUser() user: User, @Args('awardId') awardId: string) {
    return this.service.userDeleteAward(user.id, awardId)
  }
}

