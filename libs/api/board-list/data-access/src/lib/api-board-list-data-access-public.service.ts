
import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardListInput } from './dto/user-list-board-list.input'

@Injectable()
export class ApiBoardListDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBoardLists(input?: UserListBoardListInput) {
    const title = input?.title ? input.title : undefined

    return this.data.boardList.findMany({
      where: {
            AND: [{
            title: { contains: title },
            boardId: input.boardId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {cards: true}
    })
  }

  async publicSelectBoardLists(input?: UserListBoardListInput) {
    const title = input?.title ? input.title : undefined

    return this.data.boardList.findMany({
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

  async publicCountBoardLists(input?: UserListBoardListInput): Promise<CorePaging> {

    const title = input?.title ? input.title : undefined

    const total = await this.data.boardList.count(
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

  async publicBoardList(boardListId) {
    return this.data.boardList.findUnique({ where: { id: boardListId } , include: {cards: true}  })
  }
}


