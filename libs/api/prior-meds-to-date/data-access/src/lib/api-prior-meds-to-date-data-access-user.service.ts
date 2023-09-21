
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorMedsToDateInput } from './dto/user-create-prior-meds-to-date.input'
import { UserListPriorMedsToDateInput } from './dto/user-list-prior-meds-to-date.input'
import { UserUpdatePriorMedsToDateInput } from './dto/user-update-prior-meds-to-date.input'
import { UserUpdatePriorMedsToDatesInput } from './dto/user-update-prior-meds-to-dates.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListPriorMedsToDateStatusInput } from '@case-clinical/api/prior-meds-to-date-status/data-access'

@Injectable()
export class ApiPriorMedsToDateDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorMedsToDates(userId: string, input?: UserListPriorMedsToDateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
priorMedsToDateStatusId: input?.priorMedsToDateStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, priorMedsToDateStatus: true,specialty: true, visitKind: true}
    })
  }

  async userSelectPriorMedsToDates(userId: string, input?: UserListPriorMedsToDateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
priorMedsToDateStatusId: input?.priorMedsToDateStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorMedsToDates(userId: string, input?: UserListPriorMedsToDateInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDate.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
priorMedsToDateStatusId: input?.priorMedsToDateStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorMedsToDate(userId: string, priorMedsToDateId) {

    return this.data.priorMedsToDate.findUnique({ where: { id: priorMedsToDateId } , include: {legalCase: true, priorMedsToDateStatus: true,specialty: true, visitKind: true}  })
  }

  async checkPriorMedsToDateExist(priorMedsToDateName: string, legalCaseId:string) {
    try {
      return this.data.priorMedsToDate.findMany({ where: { name: priorMedsToDateName, legalCaseId:legalCaseId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorMedsToDate(userId: string, input: UserCreatePriorMedsToDateInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorMedsToDateData = await this.checkPriorMedsToDateExist(input.name, input.legalCaseId)

        if (priorMedsToDateData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorMedsToDate', 'Create', input)

    let priorMedsToDate = await this.data.priorMedsToDate.create({
      data: { 
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                priorMedsToDateStatus: 
                input.priorMedsToDateStatusId != null
                ? {
                        connect:  { 
                            id: input.priorMedsToDateStatusId
                        }
                    }: undefined,
                  specialty: 
                    input.specialtyId != null
                    ? {
                            connect:  { 
                                id: input.specialtyId
                            }
                        }: undefined,
                    visitKind: 
                    input.visitKindId != null
                    ? {
                            connect:  { 
                                id: input.visitKindId
                            }
                        }: undefined,name: input.name, 
quantity: input.quantity, 
amount: input.amount, 

}
, include: {legalCase: true, priorMedsToDateStatus: true, specialty:true, visitKind:true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorMedsToDate', 'Create', priorMedsToDate)

    return priorMedsToDate

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Meds to Date')
    }

  }


  
  

  async userUpdatePriorMedsToDate(userId: string, priorMedsToDateId: string, input: UserUpdatePriorMedsToDateInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorMedsToDateId) {
        throw new BadRequestException('Prior Meds to Date Id is required')
      } else {

      const priorMedsToDateData = await this.checkPriorMedsToDateExist(input.name, input.legalCaseId)

      if (priorMedsToDateData.length > 0) {
        if (priorMedsToDateData[0].id != priorMedsToDateId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorMedsToDate', 'Update', input)

    let priorMedsToDate = this.data.priorMedsToDate.update({
      where: { id: priorMedsToDateId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                priorMedsToDateStatus: 
                input.priorMedsToDateStatusId != null
                ? {
                        connect:  { 
                            id: input.priorMedsToDateStatusId
                        }
                    }: undefined,
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  name: input.name, 
quantity: input.quantity, 
amount: input.amount, 

}
, include: {legalCase: true, priorMedsToDateStatus: true, specialty:true, visitKind:true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorMedsToDate', 'Update', priorMedsToDate)

    return priorMedsToDate

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Meds to Date')
    }
  }

  async userUpdatePriorMedsToDates(userId: string, input: UserUpdatePriorMedsToDatesInput): Promise<UpdateResult> {
    const total = input.priorMedsToDates.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorMedsToDates) {
      const inputData = input.priorMedsToDates[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
priorMedsToDateStatusId: inputData.priorMedsToDateStatusId,
visitKindId: inputData.visitKindId,
specialtyId: inputData.specialtyId, 
quantity: inputData.quantity, 
amount: inputData.amount, 

      }

      const priorMedsToDateData = await this.checkPriorMedsToDateExist(inputData.name, inputData.legalCaseId)

      if (priorMedsToDateData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorMedsToDate.upsert({
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


  async userDeletePriorMedsToDate(userId: string, priorMedsToDateId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorMedsToDateId) {
        throw new BadRequestException('Prior Meds to Date Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorMedsToDate', 'Delete', priorMedsToDateId)

        let priorMedsToDate = this.data.priorMedsToDate.delete({
          where: { id: priorMedsToDateId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorMedsToDate', 'Delete', priorMedsToDate)

        return priorMedsToDate

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Meds to Date')
    }
  }
}

