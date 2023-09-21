
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureOrTreatmentRequestAuthorizationInput } from './dto/user-create-procedure-or-treatment-request-authorization.input'
import { UserListProcedureOrTreatmentRequestAuthorizationInput } from './dto/user-list-procedure-or-treatment-request-authorization.input'
import { UserUpdateProcedureOrTreatmentRequestAuthorizationInput } from './dto/user-update-procedure-or-treatment-request-authorization.input'
import { UserUpdateProcedureOrTreatmentRequestAuthorizationsInput } from './dto/user-update-procedure-or-treatment-request-authorizations.input'

import { UserListAuthorizationInput } from '@case-clinical/api/authorization/data-access'
import { UserListProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access'

@Injectable()
export class ApiProcedureOrTreatmentRequestAuthorizationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureOrTreatmentRequestAuthorizations(userId: string, input?: UserListProcedureOrTreatmentRequestAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: true, procedureOrTreatmentRequest: true}
    })
  }

  async userSelectProcedureOrTreatmentRequestAuthorizations(userId: string, input?: UserListProcedureOrTreatmentRequestAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountProcedureOrTreatmentRequestAuthorizations(userId: string, input?: UserListProcedureOrTreatmentRequestAuthorizationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestAuthorization.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userProcedureOrTreatmentRequestAuthorization(userId: string, procedureOrTreatmentRequestAuthorizationId) {

    return this.data.procedureOrTreatmentRequestAuthorization.findUnique({ where: { id: procedureOrTreatmentRequestAuthorizationId } , include: {authorization: true, procedureOrTreatmentRequest: true}  })
  }

  async checkProcedureOrTreatmentRequestAuthorizationExist(procedureOrTreatmentRequestAuthorizationName: string) {
    try {
      return this.data.procedureOrTreatmentRequestAuthorization.findMany({ where: { name: procedureOrTreatmentRequestAuthorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureOrTreatmentRequestAuthorization(userId: string, input: UserCreateProcedureOrTreatmentRequestAuthorizationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureOrTreatmentRequestAuthorizationData = await this.checkProcedureOrTreatmentRequestAuthorizationExist(input.name)

        if (procedureOrTreatmentRequestAuthorizationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestAuthorization', 'Create', input)

    let procedureOrTreatmentRequestAuthorization = await this.data.procedureOrTreatmentRequestAuthorization.create({
      data: { 
  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                procedureOrTreatmentRequest: 
                input.procedureOrTreatmentRequestId != null
                ? {
                        connect:  { 
                            id: input.procedureOrTreatmentRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {authorization: true, procedureOrTreatmentRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestAuthorization', 'Create', procedureOrTreatmentRequestAuthorization)

    return procedureOrTreatmentRequestAuthorization

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure or Treatment Request Authorization')
    }

  }


  
  

  async userUpdateProcedureOrTreatmentRequestAuthorization(userId: string, procedureOrTreatmentRequestAuthorizationId: string, input: UserUpdateProcedureOrTreatmentRequestAuthorizationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureOrTreatmentRequestAuthorizationId) {
        throw new BadRequestException('Procedure or Treatment Request Authorization Id is required')
      } else {

      const procedureOrTreatmentRequestAuthorizationData = await this.checkProcedureOrTreatmentRequestAuthorizationExist(input.name)

      if (procedureOrTreatmentRequestAuthorizationData.length > 0) {
        if (procedureOrTreatmentRequestAuthorizationData[0].id != procedureOrTreatmentRequestAuthorizationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestAuthorization', 'Update', input)

    let procedureOrTreatmentRequestAuthorization = this.data.procedureOrTreatmentRequestAuthorization.update({
      where: { id: procedureOrTreatmentRequestAuthorizationId },
      data: {
  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                procedureOrTreatmentRequest: 
                input.procedureOrTreatmentRequestId != null
                ? {
                        connect:  { 
                            id: input.procedureOrTreatmentRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {authorization: true, procedureOrTreatmentRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestAuthorization', 'Update', procedureOrTreatmentRequestAuthorization)

    return procedureOrTreatmentRequestAuthorization

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure or Treatment Request Authorization')
    }
  }

  async userUpdateProcedureOrTreatmentRequestAuthorizations(userId: string, input: UserUpdateProcedureOrTreatmentRequestAuthorizationsInput): Promise<UpdateResult> {
    const total = input.procedureOrTreatmentRequestAuthorizations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureOrTreatmentRequestAuthorizations) {
      const inputData = input.procedureOrTreatmentRequestAuthorizations[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
authorizationId: inputData.authorizationId, 
procedureOrTreatmentRequestId: inputData.procedureOrTreatmentRequestId, 

      }

      const procedureOrTreatmentRequestAuthorizationData = await this.checkProcedureOrTreatmentRequestAuthorizationExist(inputData.name)

      if (procedureOrTreatmentRequestAuthorizationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureOrTreatmentRequestAuthorization.upsert({
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


  async userDeleteProcedureOrTreatmentRequestAuthorization(userId: string, procedureOrTreatmentRequestAuthorizationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureOrTreatmentRequestAuthorizationId) {
        throw new BadRequestException('Procedure or Treatment Request Authorization Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestAuthorization', 'Delete', procedureOrTreatmentRequestAuthorizationId)

        let procedureOrTreatmentRequestAuthorization = this.data.procedureOrTreatmentRequestAuthorization.delete({
          where: { id: procedureOrTreatmentRequestAuthorizationId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestAuthorization', 'Delete', procedureOrTreatmentRequestAuthorization)

        return procedureOrTreatmentRequestAuthorization

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Procedure or Treatment Request Authorization')
    }
  }
}

