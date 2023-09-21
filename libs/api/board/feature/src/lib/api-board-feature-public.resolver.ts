import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBoardInput,
  ApiBoardDataAccessPublicService,
  Board,
} from '@case-clinical/api/board/data-access'

@Resolver()
export class ApiBoardFeaturePublicResolver {
  constructor(private readonly service: ApiBoardDataAccessPublicService) {}

  @Query(() => [Board], { nullable: true })
  publicBoards(
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.publicBoards(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBoards(
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.publicCountBoards(input)
  }

  @Query(() => [Board], { nullable: true })
  publicSelectBoards(
    @Args({ name: 'input', type: () => UserListBoardInput, nullable: true }) input?: UserListBoardInput,
  ) {
    return this.service.publicSelectBoards(input)
  }

  @Query(() => Board, { nullable: true })
  publicBoard(@Args('boardId') boardId: string) {
    return this.service.publicBoard(boardId)
  }
}
