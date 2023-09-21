import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardInput } from './dto/user-list-board.input'

@Injectable()
export class ApiBoardDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBoards(input?: UserListBoardInput) {
    const title = input?.title ? input.title : undefined

    return this.data.board.findMany({
      where: {
            AND: [{
            title: { contains: title }}]
          },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async publicSelectBoards(input?: UserListBoardInput) {
    const title = input?.title ? input.title : undefined

    return this.data.board.findMany({
      where: {
            AND: [{
            title: { contains: title }}]
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountBoards(input?: UserListBoardInput): Promise<CorePaging> {

    const title = input?.title ? input.title : undefined

    const total = await this.data.board.count(
    {
      where: {
            AND: [{
            title: { contains: title }}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicBoard(boardId) {
    return this.data.board.findUnique({ where: { id: boardId } , include: { lists: true }  })
  }
}


