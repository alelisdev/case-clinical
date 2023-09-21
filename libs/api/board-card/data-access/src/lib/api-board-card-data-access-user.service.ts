
import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardCardInput } from './dto/user-list-board-card.input'
import { UserCreateBoardCardInput } from './dto/user-create-board-card.input'
import { UserUpdateBoardCardInput } from './dto/user-update-board-card.input'


@Injectable()
export class ApiBoardCardDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBoardCards(userId: string, input?: UserListBoardCardInput) {
    const title = input?.title ? input.title : undefined

    return this.data.boardCard.findMany({
      where: {
            AND: [{
            title: { contains: title },
            description: { contains: input.description },
          }]
          },
      take: input?.limit,
      skip: input?.skip , include: {users: true, labels: true, documents: true,}
    })
  }

  async userSelectBoardCards(userId: string, input?: UserListBoardCardInput) {

    return this.data.boardCard.findMany({
      where: {
            AND: [{
            title: { contains: input.title },
            description: { contains: input.description },}]
          },
      select: {
        id: true,
        title: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountBoardCards(userId: string, input?: UserListBoardCardInput): Promise<CorePaging> {
    const total = await this.data.boardCard.count(
    {
      where: {
            AND: [{
            title: { contains: input.title },
            description: { contains: input.description },}]
          },

    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userBoardCard(userId: string, boardCardId: string) {
    return this.data.boardCard.findUnique({ where: { id: boardCardId } , include: {users: true, labels: true, documents: true,}  })
  }

  async userCreateBoardCard(userId: string, input: UserCreateBoardCardInput) {
    return this.data.boardCard.create({
      data: {
        title: input.title,
        description: input.description,
        position: input.position,
        dueDate: input.dueDate,
        boardList: input.boardListId ? { connect: { id: input.boardListId } } : undefined,

      },
      include: { users: true, labels: true, documents: true, }
    })
  }

  async userUpdateBoardCard(userId: string, boardCardId: string, input: UserUpdateBoardCardInput) {
    
    return this.data.boardCard.update({
      where: { id: boardCardId },
      data: {
        title: input.title,
        description: input.description,
        position: input.position,
        dueDate: input.dueDate,
        boardList: input.boardListId ? { connect: { id: input.boardListId } } : undefined,
      },
      include: { users: true, labels: true, documents: true, }
    })
  }

  async userDeleteBoardCard(userId: string, boardCardId: string) {
    return this.data.boardCard.delete({
      where: { id: boardCardId }
    })
  }
}

