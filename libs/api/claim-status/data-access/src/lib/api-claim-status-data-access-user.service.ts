
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClaimStatusInput } from './dto/user-create-claim-status.input'
import { UserListClaimStatusInput } from './dto/user-list-claim-status.input'
import { UserUpdateClaimStatusInput } from './dto/user-update-claim-status.input'
import { UserUpdateClaimStatusesInput } from './dto/user-update-claim-statuses.input'



@Injectable()
export class ApiClaimStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClaimStatuses(userId: string, input?: UserListClaimStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectClaimStatuses(userId: string, input?: UserListClaimStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimStatus.findMany({
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

  async userCountClaimStatuses(userId: string, input?: UserListClaimStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.claimStatus.count(
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

  async userClaimStatus(userId: string, claimStatusId) {

    return this.data.claimStatus.findUnique({ where: { id: claimStatusId } , include: {claimProcedures: {include: {placeOfService: true, claimStatus: true, claim: true, appointment: true}}}  })
  }

  async checkClaimStatusExist(claimStatusName: string) {
    try {
      return this.data.claimStatus.findMany({ where: { name: claimStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClaimStatus(userId: string, input: UserCreateClaimStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const claimStatusData = await this.checkClaimStatusExist(input.name)

        if (claimStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClaimStatus', 'Create', input)

    let claimStatus = await this.data.claimStatus.create({
      data: { 
name: input.name, 

}
, include: {claimProcedures: {include: {placeOfService: true, claimStatus: true, claim: true, appointment: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'ClaimStatus', 'Create', claimStatus)

    return claimStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Claim Status')
    }

  }


  
  

  async userUpdateClaimStatus(userId: string, claimStatusId: string, input: UserUpdateClaimStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!claimStatusId) {
        throw new BadRequestException('Claim Status Id is required')
      } else {

      const claimStatusData = await this.checkClaimStatusExist(input.name)

      if (claimStatusData.length > 0) {
        if (claimStatusData[0].id != claimStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClaimStatus', 'Update', input)

    let claimStatus = this.data.claimStatus.update({
      where: { id: claimStatusId },
      data: {
name: input.name, 

}
, include: {claimProcedures: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClaimStatus', 'Update', claimStatus)

    return claimStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Claim Status')
    }
  }

  async userUpdateClaimStatuses(userId: string, input: UserUpdateClaimStatusesInput): Promise<UpdateResult> {
    const total = input.claimStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.claimStatuses) {
      const inputData = input.claimStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const claimStatusData = await this.checkClaimStatusExist(inputData.name)

      if (claimStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.claimStatus.upsert({
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


  async userDeleteClaimStatus(userId: string, claimStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!claimStatusId) {
        throw new BadRequestException('Claim Status Id is required')
      } else {

        const claimProcedureCount = await this.data.claimProcedure.count({ where: { claimStatusId: claimStatusId }})
        if(claimProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim Procedure')
        }

        await this.data.logEvent(sendingUser, true, 'ClaimStatus', 'Delete', claimStatusId)

        let claimStatus = this.data.claimStatus.delete({
          where: { id: claimStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'ClaimStatus', 'Delete', claimStatus)

        return claimStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Claim Status')
    }
  }
}

