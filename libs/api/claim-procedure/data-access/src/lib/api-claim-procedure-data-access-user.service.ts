
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClaimProcedureInput } from './dto/user-create-claim-procedure.input'
import { UserListClaimProcedureInput } from './dto/user-list-claim-procedure.input'
import { UserUpdateClaimProcedureInput } from './dto/user-update-claim-procedure.input'
import { UserUpdateClaimProceduresInput } from './dto/user-update-claim-procedures.input'

import { UserListPlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access'
import { UserListClaimStatusInput } from '@case-clinical/api/claim-status/data-access'
import { UserListClaimInput } from '@case-clinical/api/claim/data-access'
import { UserListAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { UserListProcedureInput } from '@case-clinical/api/procedure/data-access'

@Injectable()
export class ApiClaimProcedureDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClaimProcedures(userId: string, input?: UserListClaimProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true}
    })
  }

  async userSelectClaimProcedures(userId: string, input?: UserListClaimProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClaimProcedures(userId: string, input?: UserListClaimProcedureInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.claimProcedure.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClaimProcedure(userId: string, claimProcedureId) {

    return this.data.claimProcedure.findUnique({ where: { id: claimProcedureId } , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true, caseAccounts: true}  })
  }

  async checkClaimProcedureExist(claimProcedureName: string) {
    try {
      return this.data.claimProcedure.findMany({ where: { name: claimProcedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClaimProcedure(userId: string, input: UserCreateClaimProcedureInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const claimProcedureData = await this.checkClaimProcedureExist(input.name)

        if (claimProcedureData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClaimProcedure', 'Create', input)

    let claimProcedure = await this.data.claimProcedure.create({
      data: { 
  
                placeOfService: 
                input.placeOfServiceId != null
                ? {
                        connect:  { 
                            id: input.placeOfServiceId
                        }
                    }: undefined,  
                claimStatus: 
                input.claimStatusId != null
                ? {
                        connect:  { 
                            id: input.claimStatusId
                        }
                    }: undefined,  
                claim: 
                input.claimId != null
                ? {
                        connect:  { 
                            id: input.claimId
                        }
                    }: undefined,  
                appointment: 
                input.appointmentId != null
                ? {
                        connect:  { 
                            id: input.appointmentId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,name: input.name, 
fromDateOfService: input.fromDateOfService, 
toDateOfService: input.toDateOfService, 
nationalDrugCode: input.nationalDrugCode, 
drugUnit: input.drugUnit, 
drugQuantity: input.drugQuantity, 
quantity: input.quantity, 
billedAmount: input.billedAmount, 
approvedAmount: input.approvedAmount, 
adjustmentAmount: input.adjustmentAmount, 
netPaymentAmount: input.netPaymentAmount, 
paymentMethod: input.paymentMethod, 
internalMemo: input.internalMemo, 
explainationOfBenefitsComment: input.explainationOfBenefitsComment, 
reason: input.reason, 
procedureCode: input.procedureCode, 
diagnosisPointer: input.diagnosisPointer, 
modifier1: input.modifier1, 
modifier2: input.modifier2, 
modifier3: input.modifier3, 
modifier4: input.modifier4, 

}
, include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true, caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClaimProcedure', 'Create', claimProcedure)

    return claimProcedure

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Claim Procedure')
    }

  }


  
  

  async userUpdateClaimProcedure(userId: string, claimProcedureId: string, input: UserUpdateClaimProcedureInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!claimProcedureId) {
        throw new BadRequestException('Claim Procedure Id is required')
      } else {

      const claimProcedureData = await this.checkClaimProcedureExist(input.name)

      if (claimProcedureData.length > 0) {
        if (claimProcedureData[0].id != claimProcedureId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClaimProcedure', 'Update', input)

    let claimProcedure = this.data.claimProcedure.update({
      where: { id: claimProcedureId },
      data: {
  
                placeOfService: 
                input.placeOfServiceId != null
                ? {
                        connect:  { 
                            id: input.placeOfServiceId
                        }
                    }: undefined,  
                claimStatus: 
                input.claimStatusId != null
                ? {
                        connect:  { 
                            id: input.claimStatusId
                        }
                    }: undefined,  
                claim: 
                input.claimId != null
                ? {
                        connect:  { 
                            id: input.claimId
                        }
                    }: undefined,  
                appointment: 
                input.appointmentId != null
                ? {
                        connect:  { 
                            id: input.appointmentId
                        }
                    }: undefined,  
                procedure: 
                input.procedureId != null
                ? {
                        connect:  { 
                            id: input.procedureId
                        }
                    }: undefined,name: input.name, 
fromDateOfService: input.fromDateOfService, 
toDateOfService: input.toDateOfService, 
nationalDrugCode: input.nationalDrugCode, 
drugUnit: input.drugUnit, 
drugQuantity: input.drugQuantity, 
quantity: input.quantity, 
billedAmount: input.billedAmount, 
approvedAmount: input.approvedAmount, 
adjustmentAmount: input.adjustmentAmount, 
netPaymentAmount: input.netPaymentAmount, 
paymentMethod: input.paymentMethod, 
internalMemo: input.internalMemo, 
explainationOfBenefitsComment: input.explainationOfBenefitsComment, 
reason: input.reason, 
procedureCode: input.procedureCode, 
diagnosisPointer: input.diagnosisPointer, 
modifier1: input.modifier1, 
modifier2: input.modifier2, 
modifier3: input.modifier3, 
modifier4: input.modifier4, 

}
, include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true, caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClaimProcedure', 'Update', claimProcedure)

    return claimProcedure

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Claim Procedure')
    }
  }

  async userUpdateClaimProcedures(userId: string, input: UserUpdateClaimProceduresInput): Promise<UpdateResult> {
    const total = input.claimProcedures.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.claimProcedures) {
      const inputData = input.claimProcedures[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
claimProcedureCodeId: inputData.claimProcedureCodeId, 
procedureCodeId: inputData.procedureCodeId, 
claimId: inputData.claimId, 
fromDateOfService: inputData.fromDateOfService, 
toDateOfService: inputData.toDateOfService, 
placeOfServiceId: inputData.placeOfServiceId, 
nationalDrugCode: inputData.nationalDrugCode, 
drugUnit: inputData.drugUnit, 
drugQuantity: inputData.drugQuantity, 
quantity: inputData.quantity, 
billedAmount: inputData.billedAmount, 
approvedAmount: inputData.approvedAmount, 
adjustmentAmount: inputData.adjustmentAmount, 
netPaymentAmount: inputData.netPaymentAmount, 
paymentMethod: inputData.paymentMethod, 
internalMemo: inputData.internalMemo, 
explainationOfBenefitsComment: inputData.explainationOfBenefitsComment, 
claimStatusId: inputData.claimStatusId, 
reason: inputData.reason, 
procedureCode: inputData.procedureCode, 
diagnosisPointer: inputData.diagnosisPointer, 
modifier1: inputData.modifier1, 
modifier2: inputData.modifier2, 
modifier3: inputData.modifier3, 
modifier4: inputData.modifier4, 
appointmentId: inputData.appointmentId, 
procedureId: inputData.procedureId, 

      }

      const claimProcedureData = await this.checkClaimProcedureExist(inputData.name)

      if (claimProcedureData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.claimProcedure.upsert({
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


  async userDeleteClaimProcedure(userId: string, claimProcedureId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!claimProcedureId) {
        throw new BadRequestException('Claim Procedure Id is required')
      } else {


        const caseAccountCount = await this.data.caseAccount.count({ where: { claimProcedureId: claimProcedureId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        await this.data.logEvent(sendingUser, true, 'ClaimProcedure', 'Delete', claimProcedureId)

        let claimProcedure = this.data.claimProcedure.delete({
          where: { id: claimProcedureId }
        })

        await this.data.logEvent(sendingUser, false, 'ClaimProcedure', 'Delete', claimProcedure)

        return claimProcedure

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Claim Procedure')
    }
  }
}

