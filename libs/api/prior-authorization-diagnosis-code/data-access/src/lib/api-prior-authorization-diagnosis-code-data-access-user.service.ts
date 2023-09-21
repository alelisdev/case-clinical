
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthorizationDiagnosisCodeInput } from './dto/user-create-prior-authorization-diagnosis-code.input'
import { UserListPriorAuthorizationDiagnosisCodeInput } from './dto/user-list-prior-authorization-diagnosis-code.input'
import { UserUpdatePriorAuthorizationDiagnosisCodeInput } from './dto/user-update-prior-authorization-diagnosis-code.input'
import { UserUpdatePriorAuthorizationDiagnosisCodesInput } from './dto/user-update-prior-authorization-diagnosis-codes.input'

import { UserListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPriorAuthorizationDiagnosisCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthorizationDiagnosisCodes(userId: string, input?: UserListPriorAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input?.diagnosisCodeId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, priorAuthorizationRequest: true}
    })
  }

  async userSelectPriorAuthorizationDiagnosisCodes(userId: string, input?: UserListPriorAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input?.diagnosisCodeId,
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

  async userCountPriorAuthorizationDiagnosisCodes(userId: string, input?: UserListPriorAuthorizationDiagnosisCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input?.diagnosisCodeId,
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

  async userPriorAuthorizationDiagnosisCode(userId: string, priorAuthorizationDiagnosisCodeId) {

    return this.data.priorAuthorizationDiagnosisCode.findUnique({ where: { id: priorAuthorizationDiagnosisCodeId } , include: {diagnosis: true, priorAuthorizationRequest: true}  })
  }

  async checkPriorAuthorizationDiagnosisCodeExist(priorAuthorizationDiagnosisCodeName: string) {
    try {
      return this.data.priorAuthorizationDiagnosisCode.findMany({ where: { name: priorAuthorizationDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthorizationDiagnosisCode(userId: string, input: UserCreatePriorAuthorizationDiagnosisCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthorizationDiagnosisCodeData = await this.checkPriorAuthorizationDiagnosisCodeExist(input.name)

        if (priorAuthorizationDiagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationDiagnosisCode', 'Create', input)

    let priorAuthorizationDiagnosisCode = await this.data.priorAuthorizationDiagnosisCode.create({
      data: { 
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationDiagnosisCode', 'Create', priorAuthorizationDiagnosisCode)

    return priorAuthorizationDiagnosisCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Authorization Diagnosis Code')
    }

  }


  
  

  async userUpdatePriorAuthorizationDiagnosisCode(userId: string, priorAuthorizationDiagnosisCodeId: string, input: UserUpdatePriorAuthorizationDiagnosisCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationDiagnosisCodeId) {
        throw new BadRequestException('Prior Authorization Diagnosis Code Id is required')
      } else {

      const priorAuthorizationDiagnosisCodeData = await this.checkPriorAuthorizationDiagnosisCodeExist(input.name)

      if (priorAuthorizationDiagnosisCodeData.length > 0) {
        if (priorAuthorizationDiagnosisCodeData[0].id != priorAuthorizationDiagnosisCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationDiagnosisCode', 'Update', input)

    let priorAuthorizationDiagnosisCode = this.data.priorAuthorizationDiagnosisCode.update({
      where: { id: priorAuthorizationDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationDiagnosisCode', 'Update', priorAuthorizationDiagnosisCode)

    return priorAuthorizationDiagnosisCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Authorization Diagnosis Code')
    }
  }

  async userUpdatePriorAuthorizationDiagnosisCodes(userId: string, input: UserUpdatePriorAuthorizationDiagnosisCodesInput): Promise<UpdateResult> {
    const total = input.priorAuthorizationDiagnosisCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthorizationDiagnosisCodes) {
      const inputData = input.priorAuthorizationDiagnosisCodes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
diagnosisCodeId: inputData.diagnosisCodeId, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 

      }

      const priorAuthorizationDiagnosisCodeData = await this.checkPriorAuthorizationDiagnosisCodeExist(inputData.name)

      if (priorAuthorizationDiagnosisCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthorizationDiagnosisCode.upsert({
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


  async userDeletePriorAuthorizationDiagnosisCode(userId: string, priorAuthorizationDiagnosisCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthorizationDiagnosisCodeId) {
        throw new BadRequestException('Prior Authorization Diagnosis Code Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthorizationDiagnosisCode', 'Delete', priorAuthorizationDiagnosisCodeId)

        let priorAuthorizationDiagnosisCode = this.data.priorAuthorizationDiagnosisCode.delete({
          where: { id: priorAuthorizationDiagnosisCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthorizationDiagnosisCode', 'Delete', priorAuthorizationDiagnosisCode)

        return priorAuthorizationDiagnosisCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Authorization Diagnosis Code')
    }
  }
}

