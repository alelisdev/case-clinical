
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationDiagnosisCodeInput } from './dto/user-create-authorization-diagnosis-code.input'
import { UserListAuthorizationDiagnosisCodeInput } from './dto/user-list-authorization-diagnosis-code.input'
import { UserUpdateAuthorizationDiagnosisCodeInput } from './dto/user-update-authorization-diagnosis-code.input'
import { UserUpdateAuthorizationDiagnosisCodesInput } from './dto/user-update-authorization-diagnosis-codes.input'

import { UserListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListAuthorizationInput } from '@case-clinical/api/authorization/data-access'

@Injectable()
export class ApiAuthorizationDiagnosisCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizationDiagnosisCodes(userId: string, input?: UserListAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, authorization: true}
    })
  }

  async userSelectAuthorizationDiagnosisCodes(userId: string, input?: UserListAuthorizationDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountAuthorizationDiagnosisCodes(userId: string, input?: UserListAuthorizationDiagnosisCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
authorizationId: input.authorizationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAuthorizationDiagnosisCode(userId: string, authorizationDiagnosisCodeId) {

    return this.data.authorizationDiagnosisCode.findUnique({ where: { id: authorizationDiagnosisCodeId } , include: {diagnosis: true, authorization: true}  })
  }

  async checkAuthorizationDiagnosisCodeExist(authorizationDiagnosisCodeName: string) {
    try {
      return this.data.authorizationDiagnosisCode.findMany({ where: { name: authorizationDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorizationDiagnosisCode(userId: string, input: UserCreateAuthorizationDiagnosisCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const authorizationDiagnosisCodeData = await this.checkAuthorizationDiagnosisCodeExist(input.name)

        if (authorizationDiagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AuthorizationDiagnosisCode', 'Create', input)

    let authorizationDiagnosisCode = await this.data.authorizationDiagnosisCode.create({
      data: { 
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, authorization: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationDiagnosisCode', 'Create', authorizationDiagnosisCode)

    return authorizationDiagnosisCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization Diagnosis Code')
    }

  }


  
  

  async userUpdateAuthorizationDiagnosisCode(userId: string, authorizationDiagnosisCodeId: string, input: UserUpdateAuthorizationDiagnosisCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationDiagnosisCodeId) {
        throw new BadRequestException('Authorization Diagnosis Code Id is required')
      } else {

      const authorizationDiagnosisCodeData = await this.checkAuthorizationDiagnosisCodeExist(input.name)

      if (authorizationDiagnosisCodeData.length > 0) {
        if (authorizationDiagnosisCodeData[0].id != authorizationDiagnosisCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AuthorizationDiagnosisCode', 'Update', input)

    let authorizationDiagnosisCode = this.data.authorizationDiagnosisCode.update({
      where: { id: authorizationDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, authorization: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationDiagnosisCode', 'Update', authorizationDiagnosisCode)

    return authorizationDiagnosisCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization Diagnosis Code')
    }
  }

  async userUpdateAuthorizationDiagnosisCodes(userId: string, input: UserUpdateAuthorizationDiagnosisCodesInput): Promise<UpdateResult> {
    const total = input.authorizationDiagnosisCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizationDiagnosisCodes) {
      const inputData = input.authorizationDiagnosisCodes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
diagnosisCodeId: inputData.diagnosisCodeId, 
authorizationId: inputData.authorizationId, 

      }

      const authorizationDiagnosisCodeData = await this.checkAuthorizationDiagnosisCodeExist(inputData.name)

      if (authorizationDiagnosisCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorizationDiagnosisCode.upsert({
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


  async userDeleteAuthorizationDiagnosisCode(userId: string, authorizationDiagnosisCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!authorizationDiagnosisCodeId) {
        throw new BadRequestException('Authorization Diagnosis Code Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'AuthorizationDiagnosisCode', 'Delete', authorizationDiagnosisCodeId)

        let authorizationDiagnosisCode = this.data.authorizationDiagnosisCode.delete({
          where: { id: authorizationDiagnosisCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationDiagnosisCode', 'Delete', authorizationDiagnosisCode)

        return authorizationDiagnosisCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Authorization Diagnosis Code')
    }
  }
}

