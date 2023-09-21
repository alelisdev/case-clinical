
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRecommendedOrderAuthorizationInput } from './dto/user-list-recommended-order-authorization.input'

@Injectable()
export class ApiRecommendedOrderAuthorizationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRecommendedOrderAuthorizations(input?: UserListRecommendedOrderAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: true, recommendedOrder: true}
    })
  }

  async publicSelectRecommendedOrderAuthorizations(input?: UserListRecommendedOrderAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRecommendedOrderAuthorizations(input?: UserListRecommendedOrderAuthorizationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrderAuthorization.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
recommendedOrderId: input.recommendedOrderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRecommendedOrderAuthorization(recommendedOrderAuthorizationId) {

    return this.data.recommendedOrderAuthorization.findUnique({ where: { id: recommendedOrderAuthorizationId } , include: {authorization: true, recommendedOrder: true}  })
  }
}


