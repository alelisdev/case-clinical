
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/user-create-procedure-or-treatment-request-diagnosis-code.input'
import { UserListProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/user-list-procedure-or-treatment-request-diagnosis-code.input'
import { UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/user-update-procedure-or-treatment-request-diagnosis-code.input'
import { UserUpdateProcedureOrTreatmentRequestDiagnosisCodesInput } from './dto/user-update-procedure-or-treatment-request-diagnosis-codes.input'

import { UserListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { UserListProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access'

@Injectable()
export class ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureOrTreatmentRequestDiagnosisCodes(userId: string, input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, procedureOrTreatmentRequest: true}
    })
  }

  async userSelectProcedureOrTreatmentRequestDiagnosisCodes(userId: string, input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async userCountProcedureOrTreatmentRequestDiagnosisCodes(userId: string, input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async userProcedureOrTreatmentRequestDiagnosisCode(userId: string, procedureOrTreatmentRequestDiagnosisCodeId) {

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findUnique({ where: { id: procedureOrTreatmentRequestDiagnosisCodeId } , include: {diagnosis: true, procedureOrTreatmentRequest: true}  })
  }

  async checkProcedureOrTreatmentRequestDiagnosisCodeExist(procedureOrTreatmentRequestDiagnosisCodeName: string) {
    try {
      return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({ where: { name: procedureOrTreatmentRequestDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureOrTreatmentRequestDiagnosisCode(userId: string, input: UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureOrTreatmentRequestDiagnosisCodeData = await this.checkProcedureOrTreatmentRequestDiagnosisCodeExist(input.name)

        if (procedureOrTreatmentRequestDiagnosisCodeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Create', input)

    let procedureOrTreatmentRequestDiagnosisCode = await this.data.procedureOrTreatmentRequestDiagnosisCode.create({
      data: { 
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
, include: {diagnosis: true, procedureOrTreatmentRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Create', procedureOrTreatmentRequestDiagnosisCode)

    return procedureOrTreatmentRequestDiagnosisCode

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure or Treatment Request Diagnosis Code')
    }

  }


  
  

  async userUpdateProcedureOrTreatmentRequestDiagnosisCode(userId: string, procedureOrTreatmentRequestDiagnosisCodeId: string, input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureOrTreatmentRequestDiagnosisCodeId) {
        throw new BadRequestException('Procedure or Treatment Request Diagnosis Code Id is required')
      } else {

      const procedureOrTreatmentRequestDiagnosisCodeData = await this.checkProcedureOrTreatmentRequestDiagnosisCodeExist(input.name)

      if (procedureOrTreatmentRequestDiagnosisCodeData.length > 0) {
        if (procedureOrTreatmentRequestDiagnosisCodeData[0].id != procedureOrTreatmentRequestDiagnosisCodeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Update', input)

    let procedureOrTreatmentRequestDiagnosisCode = this.data.procedureOrTreatmentRequestDiagnosisCode.update({
      where: { id: procedureOrTreatmentRequestDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
, include: {diagnosis: true, procedureOrTreatmentRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Update', procedureOrTreatmentRequestDiagnosisCode)

    return procedureOrTreatmentRequestDiagnosisCode

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure or Treatment Request Diagnosis Code')
    }
  }

  async userUpdateProcedureOrTreatmentRequestDiagnosisCodes(userId: string, input: UserUpdateProcedureOrTreatmentRequestDiagnosisCodesInput): Promise<UpdateResult> {
    const total = input.procedureOrTreatmentRequestDiagnosisCodes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureOrTreatmentRequestDiagnosisCodes) {
      const inputData = input.procedureOrTreatmentRequestDiagnosisCodes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
diagnosisCodeId: inputData.diagnosisCodeId, 
procedureOrTreatmentRequestId: inputData.procedureOrTreatmentRequestId, 

      }

      const procedureOrTreatmentRequestDiagnosisCodeData = await this.checkProcedureOrTreatmentRequestDiagnosisCodeExist(inputData.name)

      if (procedureOrTreatmentRequestDiagnosisCodeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureOrTreatmentRequestDiagnosisCode.upsert({
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


  async userDeleteProcedureOrTreatmentRequestDiagnosisCode(userId: string, procedureOrTreatmentRequestDiagnosisCodeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureOrTreatmentRequestDiagnosisCodeId) {
        throw new BadRequestException('Procedure or Treatment Request Diagnosis Code Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Delete', procedureOrTreatmentRequestDiagnosisCodeId)

        let procedureOrTreatmentRequestDiagnosisCode = this.data.procedureOrTreatmentRequestDiagnosisCode.delete({
          where: { id: procedureOrTreatmentRequestDiagnosisCodeId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequestDiagnosisCode', 'Delete', procedureOrTreatmentRequestDiagnosisCode)

        return procedureOrTreatmentRequestDiagnosisCode

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Procedure or Treatment Request Diagnosis Code')
    }
  }
}

