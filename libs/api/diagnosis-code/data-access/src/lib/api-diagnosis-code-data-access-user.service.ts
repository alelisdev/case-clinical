
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateDiagnosisCodeInput } from './dto/user-create-diagnosis-code.input'
import { UserListDiagnosisCodeInput } from './dto/user-list-diagnosis-code.input'
import { UserUpdateDiagnosisCodeInput } from './dto/user-update-diagnosis-code.input'
import { UserUpdateDiagnosisCodesInput } from './dto/user-update-diagnosis-codes.input'



@Injectable()
export class ApiDiagnosisCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userDiagnosisCodes(userId: string, input?: UserListDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.diagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectDiagnosisCodes(userId: string, input?: UserListDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.diagnosisCode.findMany({
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

  async userCountDiagnosisCodes(userId: string, input?: UserListDiagnosisCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.diagnosisCode.count(
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

  async userDiagnosisCode(userId: string, diagnosisCodeId) {

    return this.data.diagnosisCode.findUnique({ where: { id: diagnosisCodeId } , include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true}  })
  }

  async checkDiagnosisCodeExist(diagnosisCodeName: string) {
    try {
      return this.data.diagnosisCode.findMany({ where: { name: diagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateDiagnosisCode(userId: string, input: UserCreateDiagnosisCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const diagnosisCodeData = await this.checkDiagnosisCodeExist(input.name)

        if (diagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'DiagnosisCode', 'Create', input)

    let diagnosisCode = await this.data.diagnosisCode.create({
      data: { 
name: input.name, 

}
, include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true} 
    })

    await this.data.logEvent(sendingUser, false, 'DiagnosisCode', 'Create', diagnosisCode)

    return diagnosisCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Diagnosis Code')
    }

  }


  
  

  async userUpdateDiagnosisCode(userId: string, diagnosisCodeId: string, input: UserUpdateDiagnosisCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!diagnosisCodeId) {
        throw new BadRequestException('Diagnosis Code Id is required')
      } else {

      const diagnosisCodeData = await this.checkDiagnosisCodeExist(input.name)

      if (diagnosisCodeData.length > 0) {
        if (diagnosisCodeData[0].id != diagnosisCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'DiagnosisCode', 'Update', input)

    let diagnosisCode = this.data.diagnosisCode.update({
      where: { id: diagnosisCodeId },
      data: {
name: input.name, 

}
, include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true} 
    })

    await this.data.logEvent(sendingUser, false, 'DiagnosisCode', 'Update', diagnosisCode)

    return diagnosisCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Diagnosis Code')
    }
  }

  async userUpdateDiagnosisCodes(userId: string, input: UserUpdateDiagnosisCodesInput): Promise<UpdateResult> {
    const total = input.diagnosisCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.diagnosisCodes) {
      const inputData = input.diagnosisCodes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const diagnosisCodeData = await this.checkDiagnosisCodeExist(inputData.name)

      if (diagnosisCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.diagnosisCode.upsert({
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


  async userDeleteDiagnosisCode(userId: string, diagnosisCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!diagnosisCodeId) {
        throw new BadRequestException('Diagnosis Code Id is required')
      } else {


        const authorizationDiagnosisCodeCount = await this.data.authorizationDiagnosisCode.count({ where: { diagnosisCodeId: diagnosisCodeId }})
        if(authorizationDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Authorization Diagnosis Code')
        }


        const priorAuthorizationDiagnosisCodeCount = await this.data.priorAuthorizationDiagnosisCode.count({ where: { diagnosisCodeId: diagnosisCodeId }})
        if(priorAuthorizationDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Diagnosis Code')
        }


        const procedureOrTreatmentRequestDiagnosisCodeCount = await this.data.procedureOrTreatmentRequestDiagnosisCode.count({ where: { diagnosisCodeId: diagnosisCodeId }})
        if(procedureOrTreatmentRequestDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure or Treatment Request Diagnosis Code')
        }


        const recommendedOrderDiagnosisCodeCount = await this.data.recommendedOrderDiagnosisCode.count({ where: { diagnosisCodeId: diagnosisCodeId }})
        if(recommendedOrderDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Recommended Order Diagnosis Code')
        }


        await this.data.logEvent(sendingUser, true, 'DiagnosisCode', 'Delete', diagnosisCodeId)

        let diagnosisCode = this.data.diagnosisCode.delete({
          where: { id: diagnosisCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'DiagnosisCode', 'Delete', diagnosisCode)

        return diagnosisCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Diagnosis Code')
    }
  }
}

