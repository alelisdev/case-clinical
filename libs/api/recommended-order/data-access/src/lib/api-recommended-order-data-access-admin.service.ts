
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRecommendedOrderInput } from './dto/admin-create-recommended-order.input'
import { AdminListRecommendedOrderInput } from './dto/admin-list-recommended-order.input'

import { AdminUpdateRecommendedOrderInput } from './dto/admin-update-recommended-order.input'

@Injectable()
export class ApiRecommendedOrderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRecommendedOrders(adminId: string, input?: AdminListRecommendedOrderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrder.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountRecommendedOrders(adminId: string, input?: AdminListRecommendedOrderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrder.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminRecommendedOrder(adminId: string, recommendedOrderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.recommendedOrder.findUnique({ where: { id: recommendedOrderId } , include: {authorizations: true, diagnosisCodes: true} })
  }

  async checkRecommendedOrderExist(recommendedOrderName: string) {
    try {
      return this.data.recommendedOrder.findMany({ where: { name: recommendedOrderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRecommendedOrder(adminId: string, input: AdminCreateRecommendedOrderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const recommendedOrderData = await this.checkRecommendedOrderExist(input.name)

      if (recommendedOrderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.recommendedOrder.create({
          data: { 
    name: input.name, 
status: input.status, 

    }
    , include: {authorizations: true, diagnosisCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRecommendedOrder(adminId: string, recommendedOrderId, input: AdminUpdateRecommendedOrderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrder.update({
      where: { id: recommendedOrderId },
      data: {
name: input.name, 
status: input.status, 

}
, include: {authorizations: true, diagnosisCodes: true} 
    })
  }

  async adminDeleteRecommendedOrder(adminId: string, recommendedOrderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrder.delete({ where: { id: recommendedOrderId } })
  }
}

