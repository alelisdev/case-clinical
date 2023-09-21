
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateVisitKindInput,
  UserListVisitKindInput,
  UserUpdateVisitKindInput,
  UserUpdateVisitKindsInput,
  ApiVisitKindDataAccessUserService,
  VisitKind,
} from '@case-clinical/api/visit-kind/data-access'
import { CorePaging, UpdateResult } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'





@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiVisitKindFeatureUserResolver {
  constructor(private readonly service: ApiVisitKindDataAccessUserService) {}

  @Query(() => [VisitKind], { nullable: true })
  userVisitKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.userVisitKinds(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountVisitKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.userCountVisitKinds(user.id, input)
  }

  @Query(() => [VisitKind], { nullable: true })
  userSelectVisitKinds(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListVisitKindInput, nullable: true }) input?: UserListVisitKindInput,
  ) {
    return this.service.userSelectVisitKinds(user.id, input)
  }







  @Query(() => VisitKind, { nullable: true })
  userVisitKind(@CtxUser() user: User, @Args('visitKindId') visitKindId: string) {
    return this.service.userVisitKind(user.id, visitKindId)
  }

  @Mutation(() => VisitKind, { nullable: true })
  userCreateVisitKind(@CtxUser() user: User, @Args('input') input: UserCreateVisitKindInput,) {
    return this.service.userCreateVisitKind(user.id, input)
  }

  @Mutation(() => VisitKind, { nullable: true })
  userUpdateVisitKind(
    @CtxUser() user: User,
    @Args('visitKindId') visitKindId: string,
    @Args('input') input: UserUpdateVisitKindInput,
  ) {
    return this.service.userUpdateVisitKind(user.id, visitKindId, input)
  }

  @Mutation(() => UpdateResult, { nullable: true })
  userUpdateVisitKinds(
    @CtxUser() user: User,
    @Args('input') input: UserUpdateVisitKindsInput,
  ) {
    return this.service.userUpdateVisitKinds(user.id, input)
  }

  @Mutation(() => VisitKind, { nullable: true })
  userDeleteVisitKind(@CtxUser() user: User, @Args('visitKindId') visitKindId: string) {
    return this.service.userDeleteVisitKind(user.id, visitKindId)
  }
}

