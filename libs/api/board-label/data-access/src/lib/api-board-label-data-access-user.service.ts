import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardLabelInput } from './dto/user-list-board-label.input'
import { UserCreateBoardLabelInput } from './dto/user-create-board-label.input'
import { UserUpdateBoardLabelInput } from './dto/user-update-board-label.input'

@Injectable()
export class ApiBoardLabelDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBoardLabels(userId: string, input?: UserListBoardLabelInput) {
    const title = input?.title ? input.title : ""

    return this.data.boardLabel.findMany({
      where: {
            AND: [{
            title: { contains: title },
            boardId: input.boardId,}]
          },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userSelectBoardLabels(userId: string, input?: UserListBoardLabelInput) {
    const title = input?.title ? input.title : ""

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

  async userCountBoardLabels(userId: string, input?: UserListBoardLabelInput): Promise<CorePaging> {

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

  async userBoardLabel(userId: string, boardLabelId: string) {
    return this.data.boardLabel.findUnique({ where: { id: boardLabelId } })
  }

  async userCreateBoardLabel(userId: string, input: UserCreateBoardLabelInput) {
    return this.data.boardLabel.create({
      data: {
        title: input.title,
        board: input.boardId ? { connect: { id: input.boardId } } : undefined,
      }
    })
  }

  async userUpdateBoardLabel(userId: string, boardLabelId: string, input: UserUpdateBoardLabelInput) {
    return this.data.boardLabel.update({
      where: { id: boardLabelId },
      data: {
        title: input.title,
        board: input.boardId ? { connect: { id: input.boardId } } : undefined,
      }
    })
  }

  async userDeleteBoardLabel(userId: string, boardLabelId: string) {
    return this.data.boardLabel.delete({
      where: { id: boardLabelId }
    })
  }
}

