
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureOrTreatmentRequestInput } from './dto/user-create-procedure-or-treatment-request.input'
import { UserListProcedureOrTreatmentRequestInput } from './dto/user-list-procedure-or-treatment-request.input'
import { UserUpdateProcedureOrTreatmentRequestInput } from './dto/user-update-procedure-or-treatment-request.input'
import { UserUpdateProcedureOrTreatmentRequestsInput } from './dto/user-update-procedure-or-treatment-requests.input'



@Injectable()
export class ApiProcedureOrTreatmentRequestDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureOrTreatmentRequests(userId: string, input?: UserListProcedureOrTreatmentRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
            legalCaseId: input.legalCaseId,
            procedureTypeId: input.procedureTypeId,
            requestingProviderId: input.requestingProviderId,
            }]
          },
      take: input?.limit,
      skip: input?.skip,
      include: { patient: true, procedureType: true, legalCase: true, requestingProvider: true }
    })
  }

  async userSelectProcedureOrTreatmentRequests(userId: string, input?: UserListProcedureOrTreatmentRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
            legalCaseId: input.legalCaseId,
            procedureTypeId: input.procedureTypeId,
            requestingProviderId: input.requestingProviderId,
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

  async userCountProcedureOrTreatmentRequests(userId: string, input?: UserListProcedureOrTreatmentRequestInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
            legalCaseId: input.legalCaseId,
            procedureTypeId: input.procedureTypeId,
            requestingProviderId: input.requestingProviderId,
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

  async userProcedureOrTreatmentRequest(userId: string, procedureOrTreatmentRequestId) {
    return this.data.procedureOrTreatmentRequest.findUnique({ where: { id: procedureOrTreatmentRequestId } , include: {authorizations: true, diagnosisCodes: true, patient: true, legalCase: true, requestingProvider: true, procedureType: true}  })
  }

  async checkProcedureOrTreatmentRequestExist(procedureOrTreatmentRequestName: string) {
    try {
      return this.data.procedureOrTreatmentRequest.findMany({ where: { name: procedureOrTreatmentRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureOrTreatmentRequest(userId: string, input: UserCreateProcedureOrTreatmentRequestInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureOrTreatmentRequestData = await this.checkProcedureOrTreatmentRequestExist(input.name)

        if (procedureOrTreatmentRequestData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequest', 'Create', input)

    let procedureOrTreatmentRequest = await this.data.procedureOrTreatmentRequest.create({
      data: {
name: input.name,
patient: input.patientId
? { connect: { id: input.patientId } }
: undefined,
legalCase: input.legalCaseId
? { connect: { id: input.legalCaseId } }
: undefined,
requestingProvider: input.requestingProviderId
? { connect: { id: input.requestingProviderId } }
: undefined,
procedureType: input.procedureTypeId
? { connect: { id: input.procedureTypeId } }
: undefined,
status: input.status,

}
, include: {authorizations: true, diagnosisCodes: true, patient: true, legalCase: true, procedureType: true, requestingProvider: true}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequest', 'Create', procedureOrTreatmentRequest)

    return procedureOrTreatmentRequest

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure or Treatment Request')
    }

  }





  async userUpdateProcedureOrTreatmentRequest(userId: string, procedureOrTreatmentRequestId: string, input: UserUpdateProcedureOrTreatmentRequestInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureOrTreatmentRequestId) {
        throw new BadRequestException('Procedure or Treatment Request Id is required')
      } else {

      const procedureOrTreatmentRequestData = await this.checkProcedureOrTreatmentRequestExist(input.name)

      if (procedureOrTreatmentRequestData.length > 0) {
        if (procedureOrTreatmentRequestData[0].id != procedureOrTreatmentRequestId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequest', 'Update', input)

    let procedureOrTreatmentRequest = this.data.procedureOrTreatmentRequest.update({
      where: { id: procedureOrTreatmentRequestId },
      data: {
name: input.name,
status: input.status,
patient: input.patientId
? { connect: { id: input.patientId } }
: undefined,
legalCase: input.legalCaseId
? { connect: { id: input.legalCaseId } }
: undefined,
requestingProvider: input.requestingProviderId
? { connect: { id: input.requestingProviderId } }
: undefined,
procedureType: input.procedureTypeId
? { connect: { id: input.procedureTypeId } }
: undefined,
}
, include: {authorizations: true, diagnosisCodes: true, patient: true, legalCase: true, requestingProvider: true, procedureType: true}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequest', 'Update', procedureOrTreatmentRequest)

    return procedureOrTreatmentRequest

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure or Treatment Request')
    }
  }

  async userUpdateProcedureOrTreatmentRequests(userId: string, input: UserUpdateProcedureOrTreatmentRequestsInput): Promise<UpdateResult> {
    const total = input.procedureOrTreatmentRequests.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureOrTreatmentRequests) {
      const inputData = input.procedureOrTreatmentRequests[key]

      const data = {
        id: inputData.id,
name: inputData.name,
patientId: inputData.patientId,
legalCaseId: inputData.legalCaseId,
facilityVendorId: inputData.facilityVendorId,
facilityContractId: inputData.facilityContractId,
anesthesiaVendorId: inputData.anesthesiaVendorId,
anesthesiaVendorContractId: inputData.anesthesiaVendorContractId,
requestingProviderId: inputData.requestingProviderId,
procedureTypeId: inputData.procedureTypeId,
status: inputData.status,

      }

      const procedureOrTreatmentRequestData = await this.checkProcedureOrTreatmentRequestExist(inputData.name)

      if (procedureOrTreatmentRequestData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureOrTreatmentRequest.upsert({
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


  async userDeleteProcedureOrTreatmentRequest(userId: string, procedureOrTreatmentRequestId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureOrTreatmentRequestId) {
        throw new BadRequestException('Procedure or Treatment Request Id is required')
      } else {


        const procedureOrTreatmentRequestAuthorizationCount = await this.data.procedureOrTreatmentRequestAuthorization.count({ where: { procedureOrTreatmentRequestId: procedureOrTreatmentRequestId }})
        if(procedureOrTreatmentRequestAuthorizationCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure or Treatment Request Authorization')
        }


        const procedureOrTreatmentRequestDiagnosisCodeCount = await this.data.procedureOrTreatmentRequestDiagnosisCode.count({ where: { procedureOrTreatmentRequestId: procedureOrTreatmentRequestId }})
        if(procedureOrTreatmentRequestDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure or Treatment Request Diagnosis Code')
        }


        await this.data.logEvent(sendingUser, true, 'ProcedureOrTreatmentRequest', 'Delete', procedureOrTreatmentRequestId)

        let procedureOrTreatmentRequest = this.data.procedureOrTreatmentRequest.delete({
          where: { id: procedureOrTreatmentRequestId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureOrTreatmentRequest', 'Delete', procedureOrTreatmentRequest)

        return procedureOrTreatmentRequest

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Procedure or Treatment Request')
    }
  }
}

