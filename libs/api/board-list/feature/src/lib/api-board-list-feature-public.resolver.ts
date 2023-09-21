
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBoardListInput,
  ApiBoardListDataAccessPublicService,
  BoardList,
} from '@case-clinical/api/board-list/data-access'

@Resolver()
export class ApiBoardListFeaturePublicResolver {
  constructor(private readonly service: ApiBoardListDataAccessPublicService) {}

  @Query(() => [BoardList], { nullable: true })
  publicBoardLists(
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.publicBoardLists(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBoardLists(
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.publicCountBoardLists(input)
  }

  @Query(() => [BoardList], { nullable: true })
  publicSelectBoardLists(
    @Args({ name: 'input', type: () => UserListBoardListInput, nullable: true }) input?: UserListBoardListInput,
  ) {
    return this.service.publicSelectBoardLists(input)
  }

  @Query(() => BoardList, { nullable: true })
  publicBoardList(@Args('boardListId') boardListId: string) {
    return this.service.publicBoardList(boardListId)
  }
}
