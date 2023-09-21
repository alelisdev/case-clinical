
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRecommendedOrderInput } from './dto/user-list-recommended-order.input'

@Injectable()
export class ApiRecommendedOrderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRecommendedOrders(input?: UserListRecommendedOrderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrder.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectRecommendedOrders(input?: UserListRecommendedOrderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrder.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRecommendedOrders(input?: UserListRecommendedOrderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrder.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRecommendedOrder(recommendedOrderId) {

    return this.data.recommendedOrder.findUnique({ where: { id: recommendedOrderId } , include: {authorizations: true, diagnosisCodes: true}  })
  }
}


