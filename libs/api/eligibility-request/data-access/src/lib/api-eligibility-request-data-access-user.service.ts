
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateEligibilityRequestInput } from './dto/user-create-eligibility-request.input'
import { UserListEligibilityRequestInput } from './dto/user-list-eligibility-request.input'
import { UserUpdateEligibilityRequestInput } from './dto/user-update-eligibility-request.input'
import { UserUpdateEligibilityRequestsInput } from './dto/user-update-eligibility-requests.input'

import { UserListEligibilityStatusInput } from '@case-clinical/api/eligibility-status/data-access'

@Injectable()
export class ApiEligibilityRequestDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userEligibilityRequests(userId: string, input?: UserListEligibilityRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {elegibilityStatus: true}
    })
  }

  async userSelectEligibilityRequests(userId: string, input?: UserListEligibilityRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountEligibilityRequests(userId: string, input?: UserListEligibilityRequestInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userEligibilityRequest(userId: string, eligibilityRequestId) {

    return this.data.eligibilityRequest.findUnique({ where: { id: eligibilityRequestId } , include: {elegibilityStatus: true}  })
  }

  async checkEligibilityRequestExist(eligibilityRequestName: string) {
    try {
      return this.data.eligibilityRequest.findMany({ where: { name: eligibilityRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateEligibilityRequest(userId: string, input: UserCreateEligibilityRequestInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const eligibilityRequestData = await this.checkEligibilityRequestExist(input.name)

        if (eligibilityRequestData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'EligibilityRequest', 'Create', input)

    let eligibilityRequest = await this.data.eligibilityRequest.create({
      data: { 
  
                elegibilityStatus: 
                input.eligibilityStatusId != null
                ? {
                        connect:  { 
                            id: input.eligibilityStatusId
                        }
                    }: undefined,name: input.name, 
taxID: input.taxID, 
dateOfBirth: input.dateOfBirth, 
memberRegistrationNumber: input.memberRegistrationNumber, 

}
, include: {elegibilityStatus: true} 
    })

    await this.data.logEvent(sendingUser, false, 'EligibilityRequest', 'Create', eligibilityRequest)

    return eligibilityRequest

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Eligibility Request')
    }

  }


  
  

  async userUpdateEligibilityRequest(userId: string, eligibilityRequestId: string, input: UserUpdateEligibilityRequestInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!eligibilityRequestId) {
        throw new BadRequestException('Eligibility Request Id is required')
      } else {

      const eligibilityRequestData = await this.checkEligibilityRequestExist(input.name)

      if (eligibilityRequestData.length > 0) {
        if (eligibilityRequestData[0].id != eligibilityRequestId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'EligibilityRequest', 'Update', input)

    let eligibilityRequest = this.data.eligibilityRequest.update({
      where: { id: eligibilityRequestId },
      data: {
  
                elegibilityStatus: 
                input.eligibilityStatusId != null
                ? {
                        connect:  { 
                            id: input.eligibilityStatusId
                        }
                    }: undefined,name: input.name, 
taxID: input.taxID, 
dateOfBirth: input.dateOfBirth, 
memberRegistrationNumber: input.memberRegistrationNumber, 

}
, include: {elegibilityStatus: true} 
    })

    await this.data.logEvent(sendingUser, false, 'EligibilityRequest', 'Update', eligibilityRequest)

    return eligibilityRequest

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Eligibility Request')
    }
  }

  async userUpdateEligibilityRequests(userId: string, input: UserUpdateEligibilityRequestsInput): Promise<UpdateResult> {
    const total = input.eligibilityRequests.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.eligibilityRequests) {
      const inputData = input.eligibilityRequests[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
providerId: inputData.providerId, 
specialtyId: inputData.specialtyId, 
locationId: inputData.locationId, 
visitTypeId: inputData.visitTypeId, 
taxID: inputData.taxID, 
dateOfBirth: inputData.dateOfBirth, 
memberRegistrationNumber: inputData.memberRegistrationNumber, 
eligibilityStatusId: inputData.eligibilityStatusId, 

      }

      const eligibilityRequestData = await this.checkEligibilityRequestExist(inputData.name)

      if (eligibilityRequestData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.eligibilityRequest.upsert({
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


  async userDeleteEligibilityRequest(userId: string, eligibilityRequestId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!eligibilityRequestId) {
        throw new BadRequestException('Eligibility Request Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'EligibilityRequest', 'Delete', eligibilityRequestId)

        let eligibilityRequest = this.data.eligibilityRequest.delete({
          where: { id: eligibilityRequestId }
        })

        await this.data.logEvent(sendingUser, false, 'EligibilityRequest', 'Delete', eligibilityRequest)

        return eligibilityRequest

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Eligibility Request')
    }
  }
}

