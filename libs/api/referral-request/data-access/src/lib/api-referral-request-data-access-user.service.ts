
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateReferralRequestInput } from './dto/user-create-referral-request.input'
import { UserListReferralRequestInput } from './dto/user-list-referral-request.input'
import { UserUpdateReferralRequestInput } from './dto/user-update-referral-request.input'
import { UserUpdateReferralRequestsInput } from './dto/user-update-referral-requests.input'

import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserListClinicalProviderLocationInput } from '@case-clinical/api/clinical-provider-location/data-access'

@Injectable()
export class ApiReferralRequestDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userReferralRequests(userId: string, input?: UserListReferralRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.referralRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true}
    })
  }

  async userSelectReferralRequests(userId: string, input?: UserListReferralRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.referralRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountReferralRequests(userId: string, input?: UserListReferralRequestInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.referralRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,
requestingProviderId: input.requestingProviderId,
referredToId: input.referredToId,
clinicalProviderLocationId: input.clinicalProviderLocationId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userReferralRequest(userId: string, referralRequestId) {

    return this.data.referralRequest.findUnique({ where: { id: referralRequestId } , include: {patient: true, legalCase: true, requestingProvider: true, referredTo: true, referredToLocation: true}  })
  }

  async checkReferralRequestExist(referralRequestName: string) {
    try {
      return this.data.referralRequest.findMany({ where: { name: referralRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateReferralRequest(userId: string, input: UserCreateReferralRequestInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const referralRequestData = await this.checkReferralRequestExist(input.name)

        if (referralRequestData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ReferralRequest', 'Create', input)

    let referralRequest = await this.data.referralRequest.create({
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

    await this.data.logEvent(sendingUser, false, 'ReferralRequest', 'Create', referralRequest)

    return referralRequest

    } catch (error) {
      console.log(error)
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Referral Request')
    }

  }





  async userUpdateReferralRequest(userId: string, referralRequestId: string, input: UserUpdateReferralRequestInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!referralRequestId) {
        throw new BadRequestException('Referral Request Id is required')
      } else {

      const referralRequestData = await this.checkReferralRequestExist(input.name)

      if (referralRequestData.length > 0) {
        if (referralRequestData[0].id != referralRequestId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ReferralRequest', 'Update', input)

    let referralRequest = this.data.referralRequest.update({
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

    await this.data.logEvent(sendingUser, false, 'ReferralRequest', 'Update', referralRequest)

    return referralRequest

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException('Error in updating Referral Request')
    }
  }

  async userUpdateReferralRequests(userId: string, input: UserUpdateReferralRequestsInput): Promise<UpdateResult> {
    const total = input.referralRequests.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.referralRequests) {
      const inputData = input.referralRequests[key]

      const data = {
        id: inputData.id,
name: inputData.name,
patientId: inputData.patientId,
legalCaseId: inputData.legalCaseId,
requestingProviderId: inputData.requestingProviderId,
referredToId: inputData.referredToId,
clinicalProviderLocationId: inputData.clinicalProviderLocationId,
status: inputData.status,

      }

      const referralRequestData = await this.checkReferralRequestExist(inputData.name)

      if (referralRequestData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.referralRequest.upsert({
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


  async userDeleteReferralRequest(userId: string, referralRequestId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!referralRequestId) {
        throw new BadRequestException('Referral Request Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'ReferralRequest', 'Delete', referralRequestId)

        let referralRequest = this.data.referralRequest.delete({
          where: { id: referralRequestId }
        })

        await this.data.logEvent(sendingUser, false, 'ReferralRequest', 'Delete', referralRequest)

        return referralRequest

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Referral Request')
    }
  }
}

