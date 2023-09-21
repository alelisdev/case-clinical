
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateRequestAdditionalVisitInput } from './dto/user-create-request-additional-visit.input'
import { UserListRequestAdditionalVisitInput } from './dto/user-list-request-additional-visit.input'
import { UserUpdateRequestAdditionalVisitInput } from './dto/user-update-request-additional-visit.input'
import { UserUpdateRequestAdditionalVisitsInput } from './dto/user-update-request-additional-visits.input'

import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'

@Injectable()
export class ApiRequestAdditionalVisitDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userRequestAdditionalVisits(userId: string, input?: UserListRequestAdditionalVisitInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requestAdditionalVisit.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true}
    })
  }

  async userSelectRequestAdditionalVisits(userId: string, input?: UserListRequestAdditionalVisitInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requestAdditionalVisit.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountRequestAdditionalVisits(userId: string, input?: UserListRequestAdditionalVisitInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.requestAdditionalVisit.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userRequestAdditionalVisit(userId: string, requestAdditionalVisitId) {

    return this.data.requestAdditionalVisit.findUnique({ where: { id: requestAdditionalVisitId } , include: {patient: true, legalCase: true}  })
  }

  async checkRequestAdditionalVisitExist(requestAdditionalVisitName: string) {
    try {
      return this.data.requestAdditionalVisit.findMany({ where: { name: requestAdditionalVisitName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateRequestAdditionalVisit(userId: string, input: UserCreateRequestAdditionalVisitInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const requestAdditionalVisitData = await this.checkRequestAdditionalVisitExist(input.name)

        if (requestAdditionalVisitData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'RequestAdditionalVisit', 'Create', input)

    let requestAdditionalVisit = await this.data.requestAdditionalVisit.create({
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
                    }: undefined,name: input.name, 
numberOfVisitsBeingRequested: input.numberOfVisitsBeingRequested, 

}
, include: {patient: true, legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RequestAdditionalVisit', 'Create', requestAdditionalVisit)

    return requestAdditionalVisit

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Request Additional Visit')
    }

  }


  
  

  async userUpdateRequestAdditionalVisit(userId: string, requestAdditionalVisitId: string, input: UserUpdateRequestAdditionalVisitInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!requestAdditionalVisitId) {
        throw new BadRequestException('Request Additional Visit Id is required')
      } else {

      const requestAdditionalVisitData = await this.checkRequestAdditionalVisitExist(input.name)

      if (requestAdditionalVisitData.length > 0) {
        if (requestAdditionalVisitData[0].id != requestAdditionalVisitId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'RequestAdditionalVisit', 'Update', input)

    let requestAdditionalVisit = this.data.requestAdditionalVisit.update({
      where: { id: requestAdditionalVisitId },
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
                    }: undefined,name: input.name, 
numberOfVisitsBeingRequested: input.numberOfVisitsBeingRequested, 

}
, include: {patient: true, legalCase: true} 
    })

    await this.data.logEvent(sendingUser, false, 'RequestAdditionalVisit', 'Update', requestAdditionalVisit)

    return requestAdditionalVisit

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Request Additional Visit')
    }
  }

  async userUpdateRequestAdditionalVisits(userId: string, input: UserUpdateRequestAdditionalVisitsInput): Promise<UpdateResult> {
    const total = input.requestAdditionalVisits.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.requestAdditionalVisits) {
      const inputData = input.requestAdditionalVisits[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
patientId: inputData.patientId, 
legalCaseId: inputData.legalCaseId, 
requestingProviderId: inputData.requestingProviderId, 
numberOfVisitsBeingRequested: inputData.numberOfVisitsBeingRequested, 

      }

      const requestAdditionalVisitData = await this.checkRequestAdditionalVisitExist(inputData.name)

      if (requestAdditionalVisitData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.requestAdditionalVisit.upsert({
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


  async userDeleteRequestAdditionalVisit(userId: string, requestAdditionalVisitId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!requestAdditionalVisitId) {
        throw new BadRequestException('Request Additional Visit Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'RequestAdditionalVisit', 'Delete', requestAdditionalVisitId)

        let requestAdditionalVisit = this.data.requestAdditionalVisit.delete({
          where: { id: requestAdditionalVisitId }
        })

        await this.data.logEvent(sendingUser, false, 'RequestAdditionalVisit', 'Delete', requestAdditionalVisit)

        return requestAdditionalVisit

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Request Additional Visit')
    }
  }
}

