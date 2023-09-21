
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBoardLabelInput,
  UserListBoardLabelInput,
  UserUpdateBoardLabelInput,
  ApiBoardLabelDataAccessUserService,
  BoardLabel,
} from '@case-clinical/api/board-label/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'


@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBoardLabelFeatureUserResolver {
  constructor(private readonly service: ApiBoardLabelDataAccessUserService) {}

  @Query(() => [BoardLabel], { nullable: true })
  userBoardLabels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.userBoardLabels(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBoardLabels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.userCountBoardLabels(user.id, input)
  }

  @Query(() => [BoardLabel], { nullable: true })
  userSelectBoardLabels(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.userSelectBoardLabels(user.id, input)
  }

  @Query(() => BoardLabel, { nullable: true })
  userBoardLabel(@CtxUser() user: User, @Args('boardLabelId') boardLabelId: string) {
    return this.service.userBoardLabel(user.id, boardLabelId)
  }

  @Mutation(() => BoardLabel, { nullable: true })
  userCreateBoardLabel(@CtxUser() user: User, @Args('input') input: UserCreateBoardLabelInput,) {
    return this.service.userCreateBoardLabel(user.id, input)
  }

  @Mutation(() => BoardLabel, { nullable: true })
  userUpdateBoardLabel(
    @CtxUser() user: User,
    @Args('boardLabelId') boardLabelId: string,
    @Args('input') input: UserUpdateBoardLabelInput,
  ) {
    return this.service.userUpdateBoardLabel(user.id, boardLabelId, input)
  }


  @Mutation(() => BoardLabel, { nullable: true })
  userDeleteBoardLabel(@CtxUser() user: User, @Args('boardLabelId') boardLabelId: string) {
    return this.service.userDeleteBoardLabel(user.id, boardLabelId)
  }
}

