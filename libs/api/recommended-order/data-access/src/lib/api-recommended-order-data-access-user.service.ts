
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRecommendedOrderInput } from './dto/user-create-recommended-order.input'
import { UserListRecommendedOrderInput } from './dto/user-list-recommended-order.input'
import { UserUpdateRecommendedOrderInput } from './dto/user-update-recommended-order.input'
import { UserUpdateRecommendedOrdersInput } from './dto/user-update-recommended-orders.input'
import moment from 'moment'
import {format,calculateDaysHoursMinutesSeconds} from '@case-clinical/shared/util/helpers'

@Injectable()
export class ApiRecommendedOrderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRecommendedOrders(userId: string, input?: UserListRecommendedOrderInput) {
    let name = input?.name ? input.name : undefined

    const orders = await this.data.recommendedOrder.findMany({
      where: {
            AND: [{
            name: { contains: name },
            // authorizations: input.vendorName ? {
            //   some: {
            //     authorization: {
            //       vendor: {
            //         name: { contains: input.vendorName }
            //       }
            //     }
            //   }
            // } : undefined,
            }]
          },
      take: input?.limit,
      skip: input?.skip,
      include: {
        authorizations: {
          where: {
            authorization: input.vendorName ? {
              vendor: { name: { contains: input.vendorName } }
            } : undefined
          },
          include: {
            authorization: {
              include: {vendor: true, authorizationCategory: true, authorizationType: true, procedure: true}
            },
            recommendedOrder: true,
          }
        },
      }
    })
    orders.map((order) => {
      const from = order.updatedAt.getTime();
      const to = new Date().getTime();
      const deltaSeconds = ( ( to  - from ) / 1000 );
      const timeDelta = format( calculateDaysHoursMinutesSeconds( deltaSeconds ) );
      order['timeDelta'] = timeDelta;
    })
    return orders;
  }

  async userSelectRecommendedOrders(userId: string, input?: UserListRecommendedOrderInput) {
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

  async userCountRecommendedOrders(userId: string, input?: UserListRecommendedOrderInput): Promise<CorePaging> {
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

  async userRecommendedOrder(userId: string, recommendedOrderId) {

    return this.data.recommendedOrder.findUnique({ where: { id: recommendedOrderId } , include: {authorizations: true, diagnosisCodes: true}  })
  }

  async checkRecommendedOrderExist(recommendedOrderName: string) {
    try {
      return this.data.recommendedOrder.findMany({ where: { name: recommendedOrderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRecommendedOrder(userId: string, input: UserCreateRecommendedOrderInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const recommendedOrderData = await this.checkRecommendedOrderExist(input.name)

        if (recommendedOrderData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrder', 'Create', input)

    let recommendedOrder = await this.data.recommendedOrder.create({
      data: {
name: input.name,
patient: input.patientId ? { connect: { id: input.patientId } } : undefined,
legalCase: input.legalCaseId ? { connect: { id: input.legalCaseId } } : undefined,
requestingProvider: input.requestingProviderId ? { connect: { id: input.requestingProviderId } } : undefined,
status: input.status,

}
, include: {authorizations: true, diagnosisCodes: true}
    })

    await this.data.logEvent(sendingUser, false, 'RecommendedOrder', 'Create', recommendedOrder)

    let diagnosisCodes = [];
    if(input.diagnosisCodes) {
      console.log('input.diagnosisCodes', input.diagnosisCodes)
      for (let diagnosisCodeValue of input.diagnosisCodes) {

        diagnosisCodeValue.recommendedOrderId = recommendedOrder.id;
        diagnosisCodeValue.name = `DiagnosisCode_For_${recommendedOrder.name}`;
        console.log('diagnosisCodeValue', diagnosisCodeValue)

        diagnosisCodeValue =  await this.data.userCreateRecommendOrderDiagnosisCode(userId, diagnosisCodeValue)
        if(!diagnosisCodeValue) throw new BadRequestException('Cannot create diagnosisCode for Recommend Oder');

        diagnosisCodes.push(diagnosisCodeValue);
      }
      recommendedOrder.diagnosisCodes = diagnosisCodes;
    }
    return recommendedOrder

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Recommended Order')
    }

  }





  async userUpdateRecommendedOrder(userId: string, recommendedOrderId: string, input: UserUpdateRecommendedOrderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!recommendedOrderId) {
        throw new BadRequestException('Recommended Order Id is required')
      } else {

      const recommendedOrderData = await this.checkRecommendedOrderExist(input.name)

      if (recommendedOrderData.length > 0) {
        if (recommendedOrderData[0].id != recommendedOrderId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrder', 'Update', input)

    let recommendedOrder = this.data.recommendedOrder.update({
      where: { id: recommendedOrderId },
      data: {
name: input.name,
status: input.status,
patient: input.patientId ? { connect: { id: input.patientId } } : undefined,
legalCase: input.legalCaseId ? { connect: { id: input.legalCaseId } } : undefined,
requestingProvider: input.requestingProviderId ? { connect: { id: input.requestingProviderId } } : undefined,

}
, include: {authorizations: true, diagnosisCodes: true}
    })

    await this.data.logEvent(sendingUser, false, 'RecommendedOrder', 'Update', recommendedOrder)

    return recommendedOrder

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Recommended Order')
    }
  }

  async userUpdateRecommendedOrders(userId: string, input: UserUpdateRecommendedOrdersInput): Promise<UpdateResult> {
    const total = input.recommendedOrders.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.recommendedOrders) {
      const inputData = input.recommendedOrders[key]

      const data = {
        id: inputData.id,
name: inputData.name,
patientId: inputData.patientId,
legalCaseId: inputData.legalCaseId,
requestingProviderId: inputData.requestingProviderId,
status: inputData.status,

      }

      const recommendedOrderData = await this.checkRecommendedOrderExist(inputData.name)

      if (recommendedOrderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.recommendedOrder.upsert({
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


  async userDeleteRecommendedOrder(userId: string, recommendedOrderId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!recommendedOrderId) {
        throw new BadRequestException('Recommended Order Id is required')
      } else {


        const recommendedOrderAuthorizationCount = await this.data.recommendedOrderAuthorization.count({ where: { recommendedOrderId: recommendedOrderId }})
        if(recommendedOrderAuthorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Recommended Order Authorization')
        }


        const recommendedOrderDiagnosisCodeCount = await this.data.recommendedOrderDiagnosisCode.count({ where: { recommendedOrderId: recommendedOrderId }})
        if(recommendedOrderDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Recommended Order Diagnosis Code')
        }


        await this.data.logEvent(sendingUser, true, 'RecommendedOrder', 'Delete', recommendedOrderId)

        let recommendedOrder = this.data.recommendedOrder.delete({
          where: { id: recommendedOrderId }
        })

        await this.data.logEvent(sendingUser, false, 'RecommendedOrder', 'Delete', recommendedOrder)

        return recommendedOrder

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Recommended Order')
    }
  }
}

