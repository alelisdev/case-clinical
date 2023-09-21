
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClaimProcedureInput } from './dto/admin-create-claim-procedure.input'
import { AdminListClaimProcedureInput } from './dto/admin-list-claim-procedure.input'
import { AdminListPlaceOfServiceInput } from '@case-clinical/api/place-of-service/data-access'
import { AdminListClaimStatusInput } from '@case-clinical/api/claim-status/data-access'
import { AdminListClaimInput } from '@case-clinical/api/claim/data-access'
import { AdminListAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminListProcedureInput } from '@case-clinical/api/procedure/data-access'
import { AdminUpdateClaimProcedureInput } from './dto/admin-update-claim-procedure.input'

@Injectable()
export class ApiClaimProcedureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClaimProcedures(adminId: string, input?: AdminListClaimProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.claimProcedure.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true}
    })
  }

  async adminCountClaimProcedures(adminId: string, input?: AdminListClaimProcedureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.claimProcedure.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminClaimProcedure(adminId: string, claimProcedureId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.claimProcedure.findUnique({ where: { id: claimProcedureId } , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true, caseAccounts: true} })
  }

  async checkClaimProcedureExist(claimProcedureName: string) {
    try {
      return this.data.claimProcedure.findMany({ where: { name: claimProcedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClaimProcedure(adminId: string, input: AdminCreateClaimProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const claimProcedureData = await this.checkClaimProcedureExist(input.name)

      if (claimProcedureData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.claimProcedure.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClaimProcedure(adminId: string, claimProcedureId, input: AdminUpdateClaimProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claimProcedure.update({
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
  }

  async adminDeleteClaimProcedure(adminId: string, claimProcedureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claimProcedure.delete({ where: { id: claimProcedureId } })
  }
}

