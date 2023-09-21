
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorMedsToDateStatusInput } from './dto/user-create-prior-meds-to-date-status.input'
import { UserListPriorMedsToDateStatusInput } from './dto/user-list-prior-meds-to-date-status.input'
import { UserUpdatePriorMedsToDateStatusInput } from './dto/user-update-prior-meds-to-date-status.input'
import { UserUpdatePriorMedsToDateStatusesInput } from './dto/user-update-prior-meds-to-date-statuses.input'



@Injectable()
export class ApiPriorMedsToDateStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorMedsToDateStatuses(userId: string, input?: UserListPriorMedsToDateStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDateStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPriorMedsToDateStatuses(userId: string, input?: UserListPriorMedsToDateStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDateStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
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

  async userCountPriorMedsToDateStatuses(userId: string, input?: UserListPriorMedsToDateStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDateStatus.count(
    {
      where: {
            AND: [{
            name: { contains: name },
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

  async userPriorMedsToDateStatus(userId: string, priorMedsToDateStatusId) {

    return this.data.priorMedsToDateStatus.findUnique({ where: { id: priorMedsToDateStatusId } , include: {priorMedsToDates: {include: {legalCase: true, priorMedsToDateStatus: true}}}  })
  }

  async checkPriorMedsToDateStatusExist(priorMedsToDateStatusName: string) {
    try {
      return this.data.priorMedsToDateStatus.findMany({ where: { name: priorMedsToDateStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorMedsToDateStatus(userId: string, input: UserCreatePriorMedsToDateStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorMedsToDateStatusData = await this.checkPriorMedsToDateStatusExist(input.name)

        if (priorMedsToDateStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorMedsToDateStatus', 'Create', input)

    let priorMedsToDateStatus = await this.data.priorMedsToDateStatus.create({
      data: { 
name: input.name, 

}
, include: {priorMedsToDates: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorMedsToDateStatus', 'Create', priorMedsToDateStatus)

    return priorMedsToDateStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Meds to Date Status')
    }

  }


  
  

  async userUpdatePriorMedsToDateStatus(userId: string, priorMedsToDateStatusId: string, input: UserUpdatePriorMedsToDateStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorMedsToDateStatusId) {
        throw new BadRequestException('Prior Meds to Date Status Id is required')
      } else {

      const priorMedsToDateStatusData = await this.checkPriorMedsToDateStatusExist(input.name)

      if (priorMedsToDateStatusData.length > 0) {
        if (priorMedsToDateStatusData[0].id != priorMedsToDateStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorMedsToDateStatus', 'Update', input)

    let priorMedsToDateStatus = this.data.priorMedsToDateStatus.update({
      where: { id: priorMedsToDateStatusId },
      data: {
name: input.name, 

}
, include: {priorMedsToDates: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorMedsToDateStatus', 'Update', priorMedsToDateStatus)

    return priorMedsToDateStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Meds to Date Status')
    }
  }

  async userUpdatePriorMedsToDateStatuses(userId: string, input: UserUpdatePriorMedsToDateStatusesInput): Promise<UpdateResult> {
    const total = input.priorMedsToDateStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorMedsToDateStatuses) {
      const inputData = input.priorMedsToDateStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const priorMedsToDateStatusData = await this.checkPriorMedsToDateStatusExist(inputData.name)

      if (priorMedsToDateStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorMedsToDateStatus.upsert({
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


  async userDeletePriorMedsToDateStatus(userId: string, priorMedsToDateStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorMedsToDateStatusId) {
        throw new BadRequestException('Prior Meds to Date Status Id is required')
      } else {

        const priorMedsToDateCount = await this.data.priorMedsToDate.count({ where: { priorMedsToDateStatusId: priorMedsToDateStatusId }})
        if(priorMedsToDateCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Meds to Date')
        }

        await this.data.logEvent(sendingUser, true, 'PriorMedsToDateStatus', 'Delete', priorMedsToDateStatusId)

        let priorMedsToDateStatus = this.data.priorMedsToDateStatus.delete({
          where: { id: priorMedsToDateStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorMedsToDateStatus', 'Delete', priorMedsToDateStatus)

        return priorMedsToDateStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Meds to Date Status')
    }
  }
}

