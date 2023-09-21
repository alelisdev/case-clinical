
import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardListInput } from './dto/user-list-board-list.input'
import { UserCreateBoardListInput } from './dto/user-create-board-list.input'
import { UserUpdateBoardListInput } from './dto/user-update-board-list.input'

@Injectable()
export class ApiBoardListDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBoardLists(userId: string, input?: UserListBoardListInput) {
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

  async userSelectBoardLists(userId: string, input?: UserListBoardListInput) {
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

  async userCountBoardLists(userId: string, input?: UserListBoardListInput): Promise<CorePaging> {

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

  async userBoardList(userId: string, boardListId: string) {
    return this.data.boardList.findUnique({ where: { id: boardListId } , include: {cards: true}  })
  }

  async userCreateBoardList(userId: string, input: UserCreateBoardListInput) {
    return this.data.boardList.create({
      data: {
        title: input.title,
        position: input.position,
        board: input.boardId ? { connect: { id: input.boardId } } : undefined,
      },
      include: { cards: true }
    })
  }

  async userUpdateBoardList(userId: string, boardListId: string, input: UserUpdateBoardListInput) {
    return this.data.boardList.update({
      where: { id: boardListId },
      data: {
        title: input.title,
        position: input.position,
        board: input.boardId ? { connect: { id: input.boardId } } : undefined,
      },
      include: { cards: true }
    })
  }

  async userDeleteBoardList(userId: string, boardListId: string) {
    return this.data.boardList.delete({
      where: { id: boardListId }
    })
  }
}

