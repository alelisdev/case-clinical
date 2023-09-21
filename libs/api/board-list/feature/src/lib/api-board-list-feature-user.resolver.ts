import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBoardListInput,
  UserListBoardListInput,
  UserUpdateBoardListInput,
  ApiBoardListDataAccessUserService,
  BoardList,
} from '@case-clinical/api/board-list/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'


@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBoardListFeatureUserResolver {
  constructor(private readonly service: ApiBoardListDataAccessUserService) {}

  @Query(() => [BoardList], { nullable: true })
  userBoardLists(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.userBoardLists(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBoardLists(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.userCountBoardLists(user.id, input)
  }

  @Query(() => [BoardList], { nullable: true })
  userSelectBoardLists(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.userSelectBoardLists(user.id, input)
  }

  @Query(() => BoardList, { nullable: true })
  userBoardList(@CtxUser() user: User, @Args('boardListId') boardListId: string) {
    return this.service.userBoardList(user.id, boardListId)
  }

  @Mutation(() => BoardList, { nullable: true })
  userCreateBoardList(@CtxUser() user: User, @Args('input') input: UserCreateBoardListInput,) {
    return this.service.userCreateBoardList(user.id, input)
  }

  @Mutation(() => BoardList, { nullable: true })
  userUpdateBoardList(
    @CtxUser() user: User,
    @Args('boardListId') boardListId: string,
    @Args('input') input: UserUpdateBoardListInput,
  ) {
    return this.service.userUpdateBoardList(user.id, boardListId, input)
  }

  @Mutation(() => BoardList, { nullable: true })
  userDeleteBoardList(@CtxUser() user: User, @Args('boardListId') boardListId: string) {
    return this.service.userDeleteBoardList(user.id, boardListId)
  }
}

