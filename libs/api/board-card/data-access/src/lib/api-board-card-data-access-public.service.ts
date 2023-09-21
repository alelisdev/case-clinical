
import { Injectable } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging  } from '@case-clinical/api/core/data-access'
import { UserListBoardCardInput } from './dto/user-list-board-card.input'

@Injectable()
export class ApiBoardCardDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBoardCards(input?: UserListBoardCardInput) {
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

  async publicSelectBoardCards(input?: UserListBoardCardInput) {

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

  async publicCountBoardCards(input?: UserListBoardCardInput): Promise<CorePaging> {
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

  async publicBoardCard(boardCardId: string) {
    return this.data.boardCard.findUnique({ where: { id: boardCardId } , include: {users: true, labels: true, documents: true,}  })
  }
}


