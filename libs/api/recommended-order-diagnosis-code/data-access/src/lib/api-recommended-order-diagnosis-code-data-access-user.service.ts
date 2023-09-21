
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRecommendedOrderDiagnosisCodeInput } from './dto/user-create-recommended-order-diagnosis-code.input'
import { UserListRecommendedOrderDiagnosisCodeInput } from './dto/user-list-recommended-order-diagnosis-code.input'
import { UserUpdateRecommendedOrderDiagnosisCodeInput } from './dto/user-update-recommended-order-diagnosis-code.input'
import { UserUpdateRecommendedOrderDiagnosisCodesInput } from './dto/user-update-recommended-order-diagnosis-codes.input'

import { UserListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListRecommendedOrderInput } from '@case-clinical/api/recommended-order/data-access'

@Injectable()
export class ApiRecommendedOrderDiagnosisCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRecommendedOrderDiagnosisCodes(userId: string, input?: UserListRecommendedOrderDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
recommendedOrderId: input.recommendedOrderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, recommendedOrder: true}
    })
  }

  async userSelectRecommendedOrderDiagnosisCodes(userId: string, input?: UserListRecommendedOrderDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.recommendedOrderDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async userCountRecommendedOrderDiagnosisCodes(userId: string, input?: UserListRecommendedOrderDiagnosisCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.recommendedOrderDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async userRecommendedOrderDiagnosisCode(userId: string, recommendedOrderDiagnosisCodeId) {

    return this.data.recommendedOrderDiagnosisCode.findUnique({ where: { id: recommendedOrderDiagnosisCodeId } , include: {diagnosis: true, recommendedOrder: true}  })
  }

  async checkRecommendedOrderDiagnosisCodeExist(recommendedOrderDiagnosisCodeName: string) {
    try {
      return this.data.recommendedOrderDiagnosisCode.findMany({ where: { name: recommendedOrderDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRecommendedOrderDiagnosisCode(userId: string, input: UserCreateRecommendedOrderDiagnosisCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const recommendedOrderDiagnosisCodeData = await this.checkRecommendedOrderDiagnosisCodeExist(input.name)

        if (recommendedOrderDiagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrderDiagnosisCode', 'Create', input)

    let recommendedOrderDiagnosisCode = await this.data.recommendedOrderDiagnosisCode.create({
      data: { 
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
, include: {diagnosis: true, recommendedOrder: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RecommendedOrderDiagnosisCode', 'Create', recommendedOrderDiagnosisCode)

    return recommendedOrderDiagnosisCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Recommended Order Diagnosis Code')
    }

  }


  
  

  async userUpdateRecommendedOrderDiagnosisCode(userId: string, recommendedOrderDiagnosisCodeId: string, input: UserUpdateRecommendedOrderDiagnosisCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!recommendedOrderDiagnosisCodeId) {
        throw new BadRequestException('Recommended Order Diagnosis Code Id is required')
      } else {

      const recommendedOrderDiagnosisCodeData = await this.checkRecommendedOrderDiagnosisCodeExist(input.name)

      if (recommendedOrderDiagnosisCodeData.length > 0) {
        if (recommendedOrderDiagnosisCodeData[0].id != recommendedOrderDiagnosisCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RecommendedOrderDiagnosisCode', 'Update', input)

    let recommendedOrderDiagnosisCode = this.data.recommendedOrderDiagnosisCode.update({
      where: { id: recommendedOrderDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
, include: {diagnosis: true, recommendedOrder: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RecommendedOrderDiagnosisCode', 'Update', recommendedOrderDiagnosisCode)

    return recommendedOrderDiagnosisCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Recommended Order Diagnosis Code')
    }
  }

  async userUpdateRecommendedOrderDiagnosisCodes(userId: string, input: UserUpdateRecommendedOrderDiagnosisCodesInput): Promise<UpdateResult> {
    const total = input.recommendedOrderDiagnosisCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.recommendedOrderDiagnosisCodes) {
      const inputData = input.recommendedOrderDiagnosisCodes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
diagnosisCodeId: inputData.diagnosisCodeId, 
recommendedOrderId: inputData.recommendedOrderId, 

      }

      const recommendedOrderDiagnosisCodeData = await this.checkRecommendedOrderDiagnosisCodeExist(inputData.name)

      if (recommendedOrderDiagnosisCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.recommendedOrderDiagnosisCode.upsert({
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


  async userDeleteRecommendedOrderDiagnosisCode(userId: string, recommendedOrderDiagnosisCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!recommendedOrderDiagnosisCodeId) {
        throw new BadRequestException('Recommended Order Diagnosis Code Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'RecommendedOrderDiagnosisCode', 'Delete', recommendedOrderDiagnosisCodeId)

        let recommendedOrderDiagnosisCode = this.data.recommendedOrderDiagnosisCode.delete({
          where: { id: recommendedOrderDiagnosisCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'RecommendedOrderDiagnosisCode', 'Delete', recommendedOrderDiagnosisCode)

        return recommendedOrderDiagnosisCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Recommended Order Diagnosis Code')
    }
  }
}

