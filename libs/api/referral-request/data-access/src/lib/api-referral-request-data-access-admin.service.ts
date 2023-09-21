
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateReferralRequestInput } from './dto/admin-create-referral-request.input'
import { AdminListReferralRequestInput } from './dto/admin-list-referral-request.input'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'
import { AdminUpdateReferralRequestInput } from './dto/admin-update-referral-request.input'

@Injectable()
export class ApiReferralRequestDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminReferralRequests(adminId: string, input?: AdminListReferralRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.referralRequest.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true}
    })
  }

  async adminCountReferralRequests(adminId: string, input?: AdminListReferralRequestInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.referralRequest.count(
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

  
  

  async adminReferralRequest(adminId: string, referralRequestId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.referralRequest.findUnique({ where: { id: referralRequestId } , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true} })
  }

  async checkReferralRequestExist(referralRequestName: string) {
    try {
      return this.data.referralRequest.findMany({ where: { name: referralRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateReferralRequest(adminId: string, input: AdminCreateReferralRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const referralRequestData = await this.checkReferralRequestExist(input.name)

      if (referralRequestData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.referralRequest.create({
          data: { 
      
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                requestingProvider: 
                input.requestingProviderId != null
                ? {
                        connect:  { 
                            id: input.requestingProviderId
                        }
                    }: undefined,  
                referredTo: 
                input.referredToId != null
                ? {
                        connect:  { 
                            id: input.referredToId
                        }
                    }: undefined,  
                referredToLocation: 
                input.clinicalProviderLocationId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name, 
status: input.status, 

    }
    , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateReferralRequest(adminId: string, referralRequestId, input: AdminUpdateReferralRequestInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.referralRequest.update({
      where: { id: referralRequestId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                requestingProvider: 
                input.requestingProviderId != null
                ? {
                        connect:  { 
                            id: input.requestingProviderId
                        }
                    }: undefined,  
                referredTo: 
                input.referredToId != null
                ? {
                        connect:  { 
                            id: input.referredToId
                        }
                    }: undefined,  
                referredToLocation: 
                input.clinicalProviderLocationId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderLocationId
                        }
                    }: undefined,name: input.name, 
status: input.status, 

}
, include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true} 
    })
  }

  async adminDeleteReferralRequest(adminId: string, referralRequestId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.referralRequest.delete({ where: { id: referralRequestId } })
  }
}

