
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadStatusInput } from './dto/user-create-lead-status.input'
import { UserListLeadStatusInput } from './dto/user-list-lead-status.input'
import { UserUpdateLeadStatusInput } from './dto/user-update-lead-status.input'
import { UserUpdateLeadStatusesInput } from './dto/user-update-lead-statuses.input'



@Injectable()
export class ApiLeadStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeadStatuses(userId: string, input?: UserListLeadStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectLeadStatuses(userId: string, input?: UserListLeadStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadStatus.findMany({
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

  async userCountLeadStatuses(userId: string, input?: UserListLeadStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadStatus.count(
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

  async userLeadStatus(userId: string, leadStatusId) {

    return this.data.leadStatus.findUnique({ where: { id: leadStatusId } , include: {leads: true}  })
  }

  async checkLeadStatusExist(leadStatusName: string) {
    try {
      return this.data.leadStatus.findMany({ where: { name: leadStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLeadStatus(userId: string, input: UserCreateLeadStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadStatusData = await this.checkLeadStatusExist(input.name)

        if (leadStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'LeadStatus', 'Create', input)

    let leadStatus = await this.data.leadStatus.create({
      data: { 
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadStatus', 'Create', leadStatus)

    return leadStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead Status')
    }

  }


  
  

  async userUpdateLeadStatus(userId: string, leadStatusId: string, input: UserUpdateLeadStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadStatusId) {
        throw new BadRequestException('Lead Status Id is required')
      } else {

      const leadStatusData = await this.checkLeadStatusExist(input.name)

      if (leadStatusData.length > 0) {
        if (leadStatusData[0].id != leadStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'LeadStatus', 'Update', input)

    let leadStatus = this.data.leadStatus.update({
      where: { id: leadStatusId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadStatus', 'Update', leadStatus)

    return leadStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead Status')
    }
  }

  async userUpdateLeadStatuses(userId: string, input: UserUpdateLeadStatusesInput): Promise<UpdateResult> {
    const total = input.leadStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.leadStatuses) {
      const inputData = input.leadStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const leadStatusData = await this.checkLeadStatusExist(inputData.name)

      if (leadStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.leadStatus.upsert({
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


  async userDeleteLeadStatus(userId: string, leadStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadStatusId) {
        throw new BadRequestException('Lead Status Id is required')
      } else {


        const leadCount = await this.data.lead.count({ where: { leadStatusId: leadStatusId }})
        if(leadCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Lead')
        }


        await this.data.logEvent(sendingUser, true, 'LeadStatus', 'Delete', leadStatusId)

        let leadStatus = this.data.leadStatus.delete({
          where: { id: leadStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'LeadStatus', 'Delete', leadStatus)

        return leadStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead Status')
    }
  }
}

