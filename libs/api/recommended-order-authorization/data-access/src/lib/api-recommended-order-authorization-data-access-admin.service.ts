
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateRecommendedOrderAuthorizationInput } from './dto/admin-create-recommended-order-authorization.input'
import { AdminListRecommendedOrderAuthorizationInput } from './dto/admin-list-recommended-order-authorization.input'
import { AdminListAuthorizationInput } from '@case-clinical/api/authorization/data-access'
import { AdminListRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access'
import { AdminUpdateRecommendedOrderAuthorizationInput } from './dto/admin-update-recommended-order-authorization.input'

@Injectable()
export class ApiRecommendedOrderAuthorizationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminRecommendedOrderAuthorizations(adminId: string, input?: AdminListRecommendedOrderAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderAuthorization.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: true, recommendedOrder: true}
    })
  }

  async adminCountRecommendedOrderAuthorizations(adminId: string, input?: AdminListRecommendedOrderAuthorizationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrderAuthorization.count(
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

  
  

  async adminRecommendedOrderAuthorization(adminId: string, recommendedOrderAuthorizationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.recommendedOrderAuthorization.findUnique({ where: { id: recommendedOrderAuthorizationId } , include: {authorization: true, recommendedOrder: true} })
  }

  async checkRecommendedOrderAuthorizationExist(recommendedOrderAuthorizationName: string) {
    try {
      return this.data.recommendedOrderAuthorization.findMany({ where: { name: recommendedOrderAuthorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateRecommendedOrderAuthorization(adminId: string, input: AdminCreateRecommendedOrderAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const recommendedOrderAuthorizationData = await this.checkRecommendedOrderAuthorizationExist(input.name)

      if (recommendedOrderAuthorizationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.recommendedOrderAuthorization.create({
          data: { 
      
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                recommendedOrder: 
                input.recommendedOrderId != null
                ? {
                        connect:  { 
                            id: input.recommendedOrderId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {authorization: true, recommendedOrder: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateRecommendedOrderAuthorization(adminId: string, recommendedOrderAuthorizationId, input: AdminUpdateRecommendedOrderAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrderAuthorization.update({
      where: { id: recommendedOrderAuthorizationId },
      data: {
  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                recommendedOrder: 
                input.recommendedOrderId != null
                ? {
                        connect:  { 
                            id: input.recommendedOrderId
                        }
                    }: undefined,name: input.name, 

}
, include: {authorization: true, recommendedOrder: true} 
    })
  }

  async adminDeleteRecommendedOrderAuthorization(adminId: string, recommendedOrderAuthorizationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.recommendedOrderAuthorization.delete({ where: { id: recommendedOrderAuthorizationId } })
  }
}

