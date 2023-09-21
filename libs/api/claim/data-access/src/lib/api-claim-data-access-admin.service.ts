
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClaimInput } from './dto/admin-create-claim.input'
import { AdminListClaimInput } from './dto/admin-list-claim.input'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminUpdateClaimInput } from './dto/admin-update-claim.input'

@Injectable()
export class ApiClaimDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClaims(adminId: string, input?: AdminListClaimInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.claim.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true}
    })
  }

  async adminCountClaims(adminId: string, input?: AdminListClaimInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.claim.count(
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

  
  

  async adminClaim(adminId: string, claimId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.claim.findUnique({ where: { id: claimId } , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, procedures: true} })
  }

  async checkClaimExist(claimName: string) {
    try {
      return this.data.claim.findMany({ where: { name: claimName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClaim(adminId: string, input: AdminCreateClaimInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const claimData = await this.checkClaimExist(input.name)

      if (claimData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.claim.create({
          data: { 
      
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,  
                claim: 
                input.claimId != null
                ? {
                        connect:  { 
                            id: input.claimId
                        }
                    }: undefined,  
                explanationOfPayment: 
                input.explanationOfPaymentId != null
                ? {
                        connect:  { 
                            id: input.explanationOfPaymentId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 
originalRecordDate: input.originalRecordDate, 
receivedDate: input.receivedDate, 
dueDate: input.dueDate, 
patientName: input.patientName, 
patientPhoneNumber: input.patientPhoneNumber, 
patientDob: input.patientDob, 
patientAddressLine1: input.patientAddressLine1, 
patientAddressCity: input.patientAddressCity, 
patientAddressState: input.patientAddressState, 
patientAddressPostalCode: input.patientAddressPostalCode, 
carrierName: input.carrierName, 
carrierLine1: input.carrierLine1, 
carrierLine2: input.carrierLine2, 
carrierCity: input.carrierCity, 
carrierState: input.carrierState, 
carrierPostalCode: input.carrierPostalCode, 
insuredName: input.insuredName, 
insuredLine1: input.insuredLine1, 
insuredCity: input.insuredCity, 
insuredState: input.insuredState, 
insuredPostalCode: input.insuredPostalCode, 
insuredIdNumber: input.insuredIdNumber, 
insuredDob: input.insuredDob, 
insuredPhoneNumber: input.insuredPhoneNumber, 
patientSignature: input.patientSignature, 
diagnosisCode1: input.diagnosisCode1, 
diagnosisCode2: input.diagnosisCode2, 
diagnosisCode3: input.diagnosisCode3, 
diagnosisCode4: input.diagnosisCode4, 
diagnosisCode5: input.diagnosisCode5, 
diagnosisCode6: input.diagnosisCode6, 
diagnosisCode7: input.diagnosisCode7, 
diagnosisCode8: input.diagnosisCode8, 
totalCharges: input.totalCharges, 
amountPaid: input.amountPaid, 
physicianSignature: input.physicianSignature, 
physicianSignedOn: input.physicianSignedOn, 
serviceFacility: input.serviceFacility, 
serviceFacilityLine1: input.serviceFacilityLine1, 
serviceFacilityCity: input.serviceFacilityCity, 
serviceFacilityState: input.serviceFacilityState, 
serviceFacilityPostalCode: input.serviceFacilityPostalCode, 
serviceFacilityNpi: input.serviceFacilityNpi, 
billingFacility: input.billingFacility, 
billingLine1: input.billingLine1, 
billingCity: input.billingCity, 
billingState: input.billingState, 
billingPostalCode: input.billingPostalCode, 
billingNpi: input.billingNpi, 
billingPhoneNumber: input.billingPhoneNumber, 
billingOther: input.billingOther, 
sessionNotes: input.sessionNotes, 
referringProvider: input.referringProvider, 
referringProviderNpi: input.referringProviderNpi, 
additionalClaimInfo: input.additionalClaimInfo, 
accountNumber: input.accountNumber, 
referenceNumber: input.referenceNumber, 
facility: input.facility, 
priorAuthorizationNumber: input.priorAuthorizationNumber, 
providerName: input.providerName, 
providerNumber: input.providerNumber, 
vendor: input.vendor, 
vendorLine1: input.vendorLine1, 
vendorCSZ: input.vendorCSZ, 
totalApprovedAmount: input.totalApprovedAmount, 
totalBilledAmount: input.totalBilledAmount, 
totalNetPayAmount: input.totalNetPayAmount, 
notes: input.notes, 

    }
    , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, procedures: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClaim(adminId: string, claimId, input: AdminUpdateClaimInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claim.update({
      where: { id: claimId },
      data: {
  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,  
                claim: 
                input.claimId != null
                ? {
                        connect:  { 
                            id: input.claimId
                        }
                    }: undefined,  
                explanationOfPayment: 
                input.explanationOfPaymentId != null
                ? {
                        connect:  { 
                            id: input.explanationOfPaymentId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 
originalRecordDate: input.originalRecordDate, 
receivedDate: input.receivedDate, 
dueDate: input.dueDate, 
patientName: input.patientName, 
patientPhoneNumber: input.patientPhoneNumber, 
patientDob: input.patientDob, 
patientAddressLine1: input.patientAddressLine1, 
patientAddressCity: input.patientAddressCity, 
patientAddressState: input.patientAddressState, 
patientAddressPostalCode: input.patientAddressPostalCode, 
carrierName: input.carrierName, 
carrierLine1: input.carrierLine1, 
carrierLine2: input.carrierLine2, 
carrierCity: input.carrierCity, 
carrierState: input.carrierState, 
carrierPostalCode: input.carrierPostalCode, 
insuredName: input.insuredName, 
insuredLine1: input.insuredLine1, 
insuredCity: input.insuredCity, 
insuredState: input.insuredState, 
insuredPostalCode: input.insuredPostalCode, 
insuredIdNumber: input.insuredIdNumber, 
insuredDob: input.insuredDob, 
insuredPhoneNumber: input.insuredPhoneNumber, 
patientSignature: input.patientSignature, 
diagnosisCode1: input.diagnosisCode1, 
diagnosisCode2: input.diagnosisCode2, 
diagnosisCode3: input.diagnosisCode3, 
diagnosisCode4: input.diagnosisCode4, 
diagnosisCode5: input.diagnosisCode5, 
diagnosisCode6: input.diagnosisCode6, 
diagnosisCode7: input.diagnosisCode7, 
diagnosisCode8: input.diagnosisCode8, 
totalCharges: input.totalCharges, 
amountPaid: input.amountPaid, 
physicianSignature: input.physicianSignature, 
physicianSignedOn: input.physicianSignedOn, 
serviceFacility: input.serviceFacility, 
serviceFacilityLine1: input.serviceFacilityLine1, 
serviceFacilityCity: input.serviceFacilityCity, 
serviceFacilityState: input.serviceFacilityState, 
serviceFacilityPostalCode: input.serviceFacilityPostalCode, 
serviceFacilityNpi: input.serviceFacilityNpi, 
billingFacility: input.billingFacility, 
billingLine1: input.billingLine1, 
billingCity: input.billingCity, 
billingState: input.billingState, 
billingPostalCode: input.billingPostalCode, 
billingNpi: input.billingNpi, 
billingPhoneNumber: input.billingPhoneNumber, 
billingOther: input.billingOther, 
sessionNotes: input.sessionNotes, 
referringProvider: input.referringProvider, 
referringProviderNpi: input.referringProviderNpi, 
additionalClaimInfo: input.additionalClaimInfo, 
accountNumber: input.accountNumber, 
referenceNumber: input.referenceNumber, 
facility: input.facility, 
priorAuthorizationNumber: input.priorAuthorizationNumber, 
providerName: input.providerName, 
providerNumber: input.providerNumber, 
vendor: input.vendor, 
vendorLine1: input.vendorLine1, 
vendorCSZ: input.vendorCSZ, 
totalApprovedAmount: input.totalApprovedAmount, 
totalBilledAmount: input.totalBilledAmount, 
totalNetPayAmount: input.totalNetPayAmount, 
notes: input.notes, 

}
, include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, procedures: true} 
    })
  }

  async adminDeleteClaim(adminId: string, claimId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.claim.delete({ where: { id: claimId } })
  }
}

