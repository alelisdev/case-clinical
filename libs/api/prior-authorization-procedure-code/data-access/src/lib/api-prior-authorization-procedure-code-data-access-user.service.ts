
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthorizationProcedureCodeInput } from './dto/user-create-prior-authorization-procedure-code.input'
import { UserListPriorAuthorizationProcedureCodeInput } from './dto/user-list-prior-authorization-procedure-code.input'
import { UserUpdatePriorAuthorizationProcedureCodeInput } from './dto/user-update-prior-authorization-procedure-code.input'
import { UserUpdatePriorAuthorizationProcedureCodesInput } from './dto/user-update-prior-authorization-procedure-codes.input'

import { UserListCostCategoryInput } from '@case-clinical/api/cost-category/data-access'
import { UserListProcedureInput } from '@case-clinical/api/procedure/data-access'
import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPriorAuthorizationProcedureCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthorizationProcedureCodes(userId: string, input?: UserListPriorAuthorizationProcedureCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationProcedureCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input?.costCategoryId,
procedureId: input?.procedureId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}
    })
  }

  async userSelectPriorAuthorizationProcedureCodes(userId: string, input?: UserListPriorAuthorizationProcedureCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationProcedureCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input?.costCategoryId,
procedureId: input?.procedureId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthorizationProcedureCodes(userId: string, input?: UserListPriorAuthorizationProcedureCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationProcedureCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input?.costCategoryId,
procedureId: input?.procedureId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthorizationProcedureCode(userId: string, priorAuthorizationProcedureCodeId) {

    return this.data.priorAuthorizationProcedureCode.findUnique({ where: { id: priorAuthorizationProcedureCodeId } , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}  })
  }

  async checkPriorAuthorizationProcedureCodeExist(priorAuthorizationProcedureCodeName: string) {
    try {
      return this.data.priorAuthorizationProcedureCode.findMany({ where: { name: priorAuthorizationProcedureCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthorizationProcedureCode(userId: string, input: UserCreatePriorAuthorizationProcedureCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthorizationProcedureCodeData = await this.checkPriorAuthorizationProcedureCodeExist(input.name)

        if (priorAuthorizationProcedureCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationProcedureCode', 'Create', input)

    let priorAuthorizationProcedureCode = await this.data.priorAuthorizationProcedureCode.create({
      data: { 
  
                costCategory: 
                input.costCategoryId != null
                ? {
                        connect:  { 
                            id: input.costCategoryId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {costCategory: true, procedure: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationProcedureCode', 'Create', priorAuthorizationProcedureCode)

    return priorAuthorizationProcedureCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Authorization Procedure Code')
    }

  }


  
  

  async userUpdatePriorAuthorizationProcedureCode(userId: string, priorAuthorizationProcedureCodeId: string, input: UserUpdatePriorAuthorizationProcedureCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationProcedureCodeId) {
        throw new BadRequestException('Prior Authorization Procedure Code Id is required')
      } else {

      const priorAuthorizationProcedureCodeData = await this.checkPriorAuthorizationProcedureCodeExist(input.name)

      if (priorAuthorizationProcedureCodeData.length > 0) {
        if (priorAuthorizationProcedureCodeData[0].id != priorAuthorizationProcedureCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationProcedureCode', 'Update', input)

    let priorAuthorizationProcedureCode = this.data.priorAuthorizationProcedureCode.update({
      where: { id: priorAuthorizationProcedureCodeId },
      data: {
  
                costCategory: 
                input.costCategoryId != null
                ? {
                        connect:  { 
                            id: input.costCategoryId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 
estimatedCost: input.estimatedCost, 

}
, include: {costCategory: true, procedure: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationProcedureCode', 'Update', priorAuthorizationProcedureCode)

    return priorAuthorizationProcedureCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Authorization Procedure Code')
    }
  }

  async userUpdatePriorAuthorizationProcedureCodes(userId: string, input: UserUpdatePriorAuthorizationProcedureCodesInput): Promise<UpdateResult> {
    const total = input.priorAuthorizationProcedureCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthorizationProcedureCodes) {
      const inputData = input.priorAuthorizationProcedureCodes[key]

      const data = {
        procedureId: inputData.procedureId, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 
id: inputData.id, 
name: inputData.name, 
costCategoryId: inputData.costCategoryId, 
estimatedCost: inputData.estimatedCost, 

      }

      const priorAuthorizationProcedureCodeData = await this.checkPriorAuthorizationProcedureCodeExist(inputData.name)

      if (priorAuthorizationProcedureCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthorizationProcedureCode.upsert({
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


  async userDeletePriorAuthorizationProcedureCode(userId: string, priorAuthorizationProcedureCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthorizationProcedureCodeId) {
        throw new BadRequestException('Prior Authorization Procedure Code Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthorizationProcedureCode', 'Delete', priorAuthorizationProcedureCodeId)

        let priorAuthorizationProcedureCode = this.data.priorAuthorizationProcedureCode.delete({
          where: { id: priorAuthorizationProcedureCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthorizationProcedureCode', 'Delete', priorAuthorizationProcedureCode)

        return priorAuthorizationProcedureCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Authorization Procedure Code')
    }
  }
}

