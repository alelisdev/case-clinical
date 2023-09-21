
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  UserListBoardLabelInput,
  ApiBoardLabelDataAccessPublicService,
  BoardLabel,
} from '@case-clinical/api/board-label/data-access'

@Resolver()
export class ApiBoardLabelFeaturePublicResolver {
  constructor(private readonly service: ApiBoardLabelDataAccessPublicService) {}

  @Query(() => [BoardLabel], { nullable: true })
  publicBoardLabels(
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.publicBoardLabels(input)
  }

  @Query(() => CorePaging, { nullable: true })
  publicCountBoardLabels(
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.publicCountBoardLabels(input)
  }

  @Query(() => [BoardLabel], { nullable: true })
  publicSelectBoardLabels(
    @Args({ name: 'input', type: () => UserListBoardLabelInput, nullable: true }) input?: UserListBoardLabelInput,
  ) {
    return this.service.publicSelectBoardLabels(input)
  }

  @Query(() => BoardLabel, { nullable: true })
  publicBoardLabel(@Args('boardLabelId') boardLabelId: string) {
    return this.service.publicBoardLabel(boardLabelId)
  }
}
