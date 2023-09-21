
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBoardInput,
  UserListBoardInput,
  UserUpdateBoardInput,
  ApiBoardDataAccessUserService,
  Board,
} from '@case-clinical/api/board/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'


@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBoardFeatureUserResolver {
  constructor(private readonly service: ApiBoardDataAccessUserService) {}

  @Query(() => [Board], { nullable: true })
  userBoards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.userBoards(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBoards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.userCountBoards(user.id, input)
  }

  @Query(() => [Board], { nullable: true })
  userSelectBoards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.userSelectBoards(user.id, input)
  }

  @Query(() => Board, { nullable: true })
  userBoard(@CtxUser() user: User, @Args('boardId') boardId: string) {
    return this.service.userBoard(user.id, boardId)
  }

  @Mutation(() => Board, { nullable: true })
  userCreateBoard(@CtxUser() user: User, @Args('input') input: UserCreateBoardInput,) {
    return this.service.userCreateBoard(user.id, input)
  }

  @Mutation(() => Board, { nullable: true })
  userUpdateBoard(
    @CtxUser() user: User,
    @Args('boardId') boardId: string,
    @Args('input') input: UserUpdateBoardInput,
  ) {
    return this.service.userUpdateBoard(user.id, boardId, input)
  }

  @Mutation(() => Board, { nullable: true })
  userDeleteBoard(@CtxUser() user: User, @Args('boardId') boardId: string) {
    return this.service.userDeleteBoard(user.id, boardId)
  }
}

