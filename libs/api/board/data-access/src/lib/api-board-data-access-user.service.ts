import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardInput } from './dto/user-list-board.input'
import { UserCreateBoardInput } from './dto/user-create-board.input'
import { UserUpdateBoardInput } from './dto/user-update-board.input'


@Injectable()
export class ApiBoardDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBoards(userId: string, input?: UserListBoardInput) {
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

  async userSelectBoards(userId: string, input?: UserListBoardInput) {
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

  async userCountBoards(userId: string, input?: UserListBoardInput): Promise<CorePaging> {

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

  async userBoard(userId: string, boardId: string) {
    return this.data.board.findUnique({ where: { id: boardId } , include: { lists: { include: { cards: true } } }  })
  }

  async userCreateBoard(userId: string, input?: UserCreateBoardInput) {
    return this.data.board.create({
      data: {
        title: input?.title,
        description: input?.description,
        icon: input?.icon,
        lastActivity: input?.lastActivity
      }
    })
  }

  async userUpdateBoard(userId: string, boardId: string, input?: UserUpdateBoardInput) {
    return this.data.board.update({
      where: { id: boardId },
      data: {
        title: input.title,
        description: input.description,
        lastActivity: input.lastActivity
      }
    })
  }

  async userDeleteBoard(userId: string, boardId: string) {
    return this.data.board.delete({
      where: { id: boardId }
    })
  }
}

