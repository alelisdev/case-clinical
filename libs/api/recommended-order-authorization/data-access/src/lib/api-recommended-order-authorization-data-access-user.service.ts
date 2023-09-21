
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRecommendedOrderAuthorizationInput } from './dto/user-create-recommended-order-authorization.input'
import { UserListRecommendedOrderAuthorizationInput } from './dto/user-list-recommended-order-authorization.input'
import { UserUpdateRecommendedOrderAuthorizationInput } from './dto/user-update-recommended-order-authorization.input'
import { UserUpdateRecommendedOrderAuthorizationsInput } from './dto/user-update-recommended-order-authorizations.input'

import { UserListAuthorizationInput } from '@case-clinical/api/authorization/data-access'
import { UserListRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access'

@Injectable()
export class ApiRecommendedOrderAuthorizationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRecommendedOrderAuthorizations(userId: string, input?: UserListRecommendedOrderAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: {
        include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true}
      }, recommendedOrder: true}
    })
  }

  async userSelectRecommendedOrderAuthorizations(userId: string, input?: UserListRecommendedOrderAuthorizationInput) {
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

  async userCountRecommendedOrderAuthorizations(userId: string, input?: UserListRecommendedOrderAuthorizationInput): Promise<CorePaging> {
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

  async userRecommendedOrderAuthorization(userId: string, recommendedOrderAuthorizationId) {

    return this.data.recommendedOrderAuthorization.findUnique({ where: { id: recommendedOrderAuthorizationId } , include: {authorization: true, recommendedOrder: true}  })
  }

  async checkRecommendedOrderAuthorizationExist(recommendedOrderAuthorizationName: string) {
    try {
      return this.data.recommendedOrderAuthorization.findMany({ where: { name: recommendedOrderAuthorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRecommendedOrderAuthorization(userId: string, input: UserCreateRecommendedOrderAuthorizationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const recommendedOrderAuthorizationData = await this.checkRecommendedOrderAuthorizationExist(input.name)

        if (recommendedOrderAuthorizationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrderAuthorization', 'Create', input)

    let recommendedOrderAuthorization = await this.data.recommendedOrderAuthorization.create({
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

    await this.data.logEvent(sendingUser, false, 'RecommendedOrderAuthorization', 'Create', recommendedOrderAuthorization)

    return recommendedOrderAuthorization

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Recommended Order Authorization')
    }

  }





  async userUpdateRecommendedOrderAuthorization(userId: string, recommendedOrderAuthorizationId: string, input: UserUpdateRecommendedOrderAuthorizationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!recommendedOrderAuthorizationId) {
        throw new BadRequestException('Recommended Order Authorization Id is required')
      } else {

      const recommendedOrderAuthorizationData = await this.checkRecommendedOrderAuthorizationExist(input.name)

      if (recommendedOrderAuthorizationData.length > 0) {
        if (recommendedOrderAuthorizationData[0].id != recommendedOrderAuthorizationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrderAuthorization', 'Update', input)

    let recommendedOrderAuthorization = this.data.recommendedOrderAuthorization.update({
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

    await this.data.logEvent(sendingUser, false, 'RecommendedOrderAuthorization', 'Update', recommendedOrderAuthorization)

    return recommendedOrderAuthorization

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Recommended Order Authorization')
    }
  }

  async userUpdateRecommendedOrderAuthorizations(userId: string, input: UserUpdateRecommendedOrderAuthorizationsInput): Promise<UpdateResult> {
    const total = input.recommendedOrderAuthorizations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.recommendedOrderAuthorizations) {
      const inputData = input.recommendedOrderAuthorizations[key]

      const data = {
        id: inputData.id,
name: inputData.name,
authorizationId: inputData.authorizationId,
recommendedOrderId: inputData.recommendedOrderId,

      }

      const recommendedOrderAuthorizationData = await this.checkRecommendedOrderAuthorizationExist(inputData.name)

      if (recommendedOrderAuthorizationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.recommendedOrderAuthorization.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteRecommendedOrderAuthorization(userId: string, recommendedOrderAuthorizationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!recommendedOrderAuthorizationId) {
        throw new BadRequestException('Recommended Order Authorization Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'RecommendedOrderAuthorization', 'Delete', recommendedOrderAuthorizationId)

        let recommendedOrderAuthorization = this.data.recommendedOrderAuthorization.delete({
          where: { id: recommendedOrderAuthorizationId }
        })

        await this.data.logEvent(sendingUser, false, 'RecommendedOrderAuthorization', 'Delete', recommendedOrderAuthorization)

        return recommendedOrderAuthorization

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Recommended Order Authorization')
    }
  }
}

