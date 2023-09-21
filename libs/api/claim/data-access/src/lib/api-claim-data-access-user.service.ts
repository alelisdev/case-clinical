
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClaimInput } from './dto/user-create-claim.input'
import { UserListClaimInput } from './dto/user-list-claim.input'
import { UserUpdateClaimInput } from './dto/user-update-claim.input'
import { UserUpdateClaimsInput } from './dto/user-update-claims.input'

import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'
import { UserListPatientInput } from '@case-clinical/api/patient/data-access'

@Injectable()
export class ApiClaimDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClaims(userId: string, input?: UserListClaimInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claim.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input?.priorAuthorizationRequestId,
claimId: input?.claimId,
explanationOfPaymentId: input?.explanationOfPaymentId,
patientId: input?.patientId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true}
    })
  }

  async userSelectClaims(userId: string, input?: UserListClaimInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claim.findMany({
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input?.priorAuthorizationRequestId,
claimId: input?.claimId,
explanationOfPaymentId: input?.explanationOfPaymentId,
patientId: input?.patientId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClaims(userId: string, input?: UserListClaimInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.claim.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            priorAuthorizationRequestId: input?.priorAuthorizationRequestId,
claimId: input?.claimId,
explanationOfPaymentId: input?.explanationOfPaymentId,
patientId: input?.patientId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClaim(userId: string, claimId) {

    return this.data.claim.findUnique({ where: { id: claimId } , 
      include: {
        priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, 
        procedures: {
          include:{
            placeOfService: true,
            claimStatus: true,
            claim: true,
            appointment: true,
          }
        }}  })
  }

  async checkClaimExist(claimName: string) {
    try {
      return this.data.claim.findMany({ where: { name: claimName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClaim(userId: string, input: UserCreateClaimInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const claimData = await this.checkClaimExist(input.name)

        if (claimData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }


    if(input.claim){
      let claimId = (await this.data.userCreateDocument(userId, input.claim)).id
      if(claimId){
        input.claimId = claimId
     }
    }


    if(input.explanationOfPayment){
      let explanationOfPaymentId = (await this.data.userCreateDocument(userId, input.explanationOfPayment)).id
      if(explanationOfPaymentId){
        input.explanationOfPaymentId = explanationOfPaymentId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Claim', 'Create', input)

    let claim = await this.data.claim.create({
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

    await this.data.logEvent(sendingUser, false, 'Claim', 'Create', claim)

    return claim

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Claim')
    }

  }


  
  

  async userUpdateClaim(userId: string, claimId: string, input: UserUpdateClaimInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!claimId) {
        throw new BadRequestException('Claim Id is required')
      } else {

      const claimData = await this.checkClaimExist(input.name)

      if (claimData.length > 0) {
        if (claimData[0].id != claimId) {
          throw new ConflictException("Record must be unique.")
        }
      }


    if(input.claim){
      let claimId = (await this.data.userCreateDocument(userId, input.claim)).id
      if(claimId){
        input.claimId = claimId
     }
    }


    if(input.explanationOfPayment){
      let explanationOfPaymentId = (await this.data.userCreateDocument(userId, input.explanationOfPayment)).id
      if(explanationOfPaymentId){
        input.explanationOfPaymentId = explanationOfPaymentId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Claim', 'Update', input)

    let claim = this.data.claim.update({
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
vendorTaxId:input.vendorTaxId,
federalTaxId:input.federalTaxId

}
, include: {priorAuthorizationRequest: true, claim: true, explanationOfPayment: true, patient: true, procedures: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Claim', 'Update', claim)

    return claim

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Claim')
    }
  }

  async userUpdateClaims(userId: string, input: UserUpdateClaimsInput): Promise<UpdateResult> {
    const total = input.claims.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.claims) {
      const inputData = input.claims[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
originalRecordDate: inputData.originalRecordDate, 
receivedDate: inputData.receivedDate, 
dueDate: inputData.dueDate, 
patientName: inputData.patientName, 
patientPhoneNumber: inputData.patientPhoneNumber, 
patientDob: inputData.patientDob, 
patientAddressLine1: inputData.patientAddressLine1, 
patientAddressCity: inputData.patientAddressCity, 
patientAddressState: inputData.patientAddressState, 
patientAddressPostalCode: inputData.patientAddressPostalCode, 
carrierName: inputData.carrierName, 
carrierLine1: inputData.carrierLine1, 
carrierLine2: inputData.carrierLine2, 
carrierCity: inputData.carrierCity, 
carrierState: inputData.carrierState, 
carrierPostalCode: inputData.carrierPostalCode, 
insuredName: inputData.insuredName, 
insuredLine1: inputData.insuredLine1, 
insuredCity: inputData.insuredCity, 
insuredState: inputData.insuredState, 
insuredPostalCode: inputData.insuredPostalCode, 
insuredIdNumber: inputData.insuredIdNumber, 
insuredDob: inputData.insuredDob, 
insuredPhoneNumber: inputData.insuredPhoneNumber, 
patientSignature: inputData.patientSignature, 
diagnosisCode1: inputData.diagnosisCode1, 
diagnosisCode2: inputData.diagnosisCode2, 
diagnosisCode3: inputData.diagnosisCode3, 
diagnosisCode4: inputData.diagnosisCode4, 
diagnosisCode5: inputData.diagnosisCode5, 
diagnosisCode6: inputData.diagnosisCode6, 
diagnosisCode7: inputData.diagnosisCode7, 
diagnosisCode8: inputData.diagnosisCode8, 
federalTaxId: inputData.federalTaxId, 
totalCharges: inputData.totalCharges, 
amountPaid: inputData.amountPaid, 
physicianSignature: inputData.physicianSignature, 
physicianSignedOn: inputData.physicianSignedOn, 
serviceFacility: inputData.serviceFacility, 
serviceFacilityLine1: inputData.serviceFacilityLine1, 
serviceFacilityCity: inputData.serviceFacilityCity, 
serviceFacilityState: inputData.serviceFacilityState, 
serviceFacilityPostalCode: inputData.serviceFacilityPostalCode, 
serviceFacilityNpi: inputData.serviceFacilityNpi, 
billingFacility: inputData.billingFacility, 
billingLine1: inputData.billingLine1, 
billingCity: inputData.billingCity, 
billingState: inputData.billingState, 
billingPostalCode: inputData.billingPostalCode, 
billingNpi: inputData.billingNpi, 
billingPhoneNumber: inputData.billingPhoneNumber, 
billingOther: inputData.billingOther, 
sessionNotes: inputData.sessionNotes, 
referringProvider: inputData.referringProvider, 
referringProviderNpi: inputData.referringProviderNpi, 
additionalClaimInfo: inputData.additionalClaimInfo, 
accountNumber: inputData.accountNumber, 
referenceNumber: inputData.referenceNumber, 
facility: inputData.facility, 
priorAuthorizationNumber: inputData.priorAuthorizationNumber, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 
providerName: inputData.providerName, 
providerNumber: inputData.providerNumber, 
vendor: inputData.vendor, 
vendorLine1: inputData.vendorLine1, 
vendorCSZ: inputData.vendorCSZ, 
vendorTaxId: inputData.vendorTaxId, 
totalApprovedAmount: inputData.totalApprovedAmount, 
totalBilledAmount: inputData.totalBilledAmount, 
totalNetPayAmount: inputData.totalNetPayAmount, 
notes: inputData.notes, 
claimId: inputData.claimId, 
explanationOfPaymentId: inputData.explanationOfPaymentId, 
patientId: inputData.patientId, 

      }

      const claimData = await this.checkClaimExist(inputData.name)

      if (claimData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.claim.upsert({
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


  async userDeleteClaim(userId: string, claimId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!claimId) {
        throw new BadRequestException('Claim Id is required')
      } else {


        const claimProcedureCount = await this.data.claimProcedure.count({ where: { claimId: claimId }})
        if(claimProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim Procedure')
        }


        await this.data.logEvent(sendingUser, true, 'Claim', 'Delete', claimId)

        let claim = this.data.claim.delete({
          where: { id: claimId }
        })

        await this.data.logEvent(sendingUser, false, 'Claim', 'Delete', claim)

        return claim

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Claim')
    }
  }
}

