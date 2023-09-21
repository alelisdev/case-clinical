
import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardLabelInput } from './dto/user-list-board-label.input'

@Injectable()
export class ApiBoardLabelDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBoardLabels(input?: UserListBoardLabelInput) {
    const title = input?.title ? input.title : undefined

    return this.data.boardLabel.findMany({
      where: {
            AND: [{
            title: { contains: title },
            boardId: input.boardId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {}
    })
  }

  async publicSelectBoardLabels(input?: UserListBoardLabelInput) {
    const title = input?.title ? input.title : undefined

    return this.data.boardLabel.findMany({
      where: {
            AND: [{
            title: { contains: title },
            boardId: input.boardId,}]
          },
      select: {
        id: true,
        title: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountBoardLabels(input?: UserListBoardLabelInput): Promise<CorePaging> {

    const title = input?.title ? input.title : undefined

    const total = await this.data.boardLabel.count(
    {
      where: {
            AND: [{
            title: { contains: title },
            boardId: input.boardId,}]
          },
    }
    )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicBoardLabel(boardLabelId: string) {
    return this.data.boardLabel.findUnique({ where: { id: boardLabelId } })
  }
}


