
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBoardCardInput,
  ApiBoardCardDataAccessPublicService,
  BoardCard,
} from '@case-clinical/api/board-card/data-access'

@Resolver()
export class ApiBoardCardFeaturePublicResolver {
  constructor(private readonly service: ApiBoardCardDataAccessPublicService) {}

  @Query(() => [BoardCard], { nullable: true })
  publicBoardCards(
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.publicBoardCards(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBoardCards(
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.publicCountBoardCards(input)
  }

  @Query(() => [BoardCard], { nullable: true })
  publicSelectBoardCards(
    @Args({ name: 'input', type: () => UserListBoardCardInput, nullable: true }) input?: UserListBoardCardInput,
  ) {
    return this.service.publicSelectBoardCards(input)
  }

  @Query(() => BoardCard, { nullable: true })
  publicBoardCard(@Args('boardCardId') boardCardId: string) {
    return this.service.publicBoardCard(boardCardId)
  }
}
