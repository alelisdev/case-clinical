
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  UserCreateBoardCardInput,
  UserListBoardCardInput,
  UserUpdateBoardCardInput,
  ApiBoardCardDataAccessUserService,
  BoardCard,
} from '@case-clinical/api/board-card/data-access'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
  GqlAuthGuard
} from '@case-clinical/api/auth/util'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiBoardCardFeatureUserResolver {
  constructor(private readonly service: ApiBoardCardDataAccessUserService) {}

  @Query(() => [BoardCard], { nullable: true })
  userBoardCards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.userBoardCards(user.id, input)
  }

  @Query(() => CorePaging, { nullable: true })
  userCountBoardCards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.userCountBoardCards(user.id, input)
  }

  @Query(() => [BoardCard], { nullable: true })
  userSelectBoardCards(
    @CtxUser() user: User,
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.userSelectBoardCards(user.id, input)
  }

  @Query(() => BoardCard, { nullable: true })
  userBoardCard(@CtxUser() user: User, @Args('boardCardId') boardCardId: string) {
    return this.service.userBoardCard(user.id, boardCardId)
  }

  @Mutation(() => BoardCard, { nullable: true })
  userCreateBoardCard(@CtxUser() user: User, @Args('input') input: UserCreateBoardCardInput,) {
    return this.service.userCreateBoardCard(user.id, input)
  }

  @Mutation(() => BoardCard, { nullable: true })
  userUpdateBoardCard(
    @CtxUser() user: User,
    @Args('boardCardId') boardCardId: string,
    @Args('input') input: UserUpdateBoardCardInput,
  ) {
    return this.service.userUpdateBoardCard(user.id, boardCardId, input)
  }

  @Mutation(() => BoardCard, { nullable: true })
  userDeleteBoardCard(@CtxUser() user: User, @Args('boardCardId') boardCardId: string) {
    return this.service.userDeleteBoardCard(user.id, boardCardId)
  }
}

