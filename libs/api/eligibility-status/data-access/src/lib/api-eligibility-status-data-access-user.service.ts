
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateEligibilityStatusInput } from './dto/user-create-eligibility-status.input'
import { UserListEligibilityStatusInput } from './dto/user-list-eligibility-status.input'
import { UserUpdateEligibilityStatusInput } from './dto/user-update-eligibility-status.input'
import { UserUpdateEligibilityStatusesInput } from './dto/user-update-eligibility-statuses.input'



@Injectable()
export class ApiEligibilityStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userEligibilityStatuses(userId: string, input?: UserListEligibilityStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectEligibilityStatuses(userId: string, input?: UserListEligibilityStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityStatus.findMany({
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

  async userCountEligibilityStatuses(userId: string, input?: UserListEligibilityStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityStatus.count(
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

  async userEligibilityStatus(userId: string, eligibilityStatusId) {

    return this.data.eligibilityStatus.findUnique({ where: { id: eligibilityStatusId } , include: {eligibilityRequests: true}  })
  }

  async checkEligibilityStatusExist(eligibilityStatusName: string) {
    try {
      return this.data.eligibilityStatus.findMany({ where: { name: eligibilityStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateEligibilityStatus(userId: string, input: UserCreateEligibilityStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const eligibilityStatusData = await this.checkEligibilityStatusExist(input.name)

        if (eligibilityStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'EligibilityStatus', 'Create', input)

    let eligibilityStatus = await this.data.eligibilityStatus.create({
      data: { 
name: input.name, 

}
, include: {eligibilityRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'EligibilityStatus', 'Create', eligibilityStatus)

    return eligibilityStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Eligibility Status')
    }

  }


  
  

  async userUpdateEligibilityStatus(userId: string, eligibilityStatusId: string, input: UserUpdateEligibilityStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!eligibilityStatusId) {
        throw new BadRequestException('Eligibility Status Id is required')
      } else {

      const eligibilityStatusData = await this.checkEligibilityStatusExist(input.name)

      if (eligibilityStatusData.length > 0) {
        if (eligibilityStatusData[0].id != eligibilityStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'EligibilityStatus', 'Update', input)

    let eligibilityStatus = this.data.eligibilityStatus.update({
      where: { id: eligibilityStatusId },
      data: {
name: input.name, 

}
, include: {eligibilityRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'EligibilityStatus', 'Update', eligibilityStatus)

    return eligibilityStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Eligibility Status')
    }
  }

  async userUpdateEligibilityStatuses(userId: string, input: UserUpdateEligibilityStatusesInput): Promise<UpdateResult> {
    const total = input.eligibilityStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.eligibilityStatuses) {
      const inputData = input.eligibilityStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const eligibilityStatusData = await this.checkEligibilityStatusExist(inputData.name)

      if (eligibilityStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.eligibilityStatus.upsert({
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


  async userDeleteEligibilityStatus(userId: string, eligibilityStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!eligibilityStatusId) {
        throw new BadRequestException('Eligibility Status Id is required')
      } else {


        const eligibilityRequestCount = await this.data.eligibilityRequest.count({ where: { eligibilityStatusId: eligibilityStatusId }})
        if(eligibilityRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Eligibility Request')
        }


        await this.data.logEvent(sendingUser, true, 'EligibilityStatus', 'Delete', eligibilityStatusId)

        let eligibilityStatus = this.data.eligibilityStatus.delete({
          where: { id: eligibilityStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'EligibilityStatus', 'Delete', eligibilityStatus)

        return eligibilityStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Eligibility Status')
    }
  }
}

