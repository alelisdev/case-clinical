
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateLeadActionInput } from './dto/user-create-lead-action.input'
import { UserListLeadActionInput } from './dto/user-list-lead-action.input'
import { UserUpdateLeadActionInput } from './dto/user-update-lead-action.input'
import { UserUpdateLeadActionsInput } from './dto/user-update-lead-actions.input'

import { UserListLeadInput } from '@case-clinical/api/lead/data-access'

@Injectable()
export class ApiLeadActionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userLeadActions(userId: string, input?: UserListLeadActionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadAction.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true}
    })
  }

  async userSelectLeadActions(userId: string, input?: UserListLeadActionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.leadAction.findMany({
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLeadActions(userId: string, input?: UserListLeadActionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadAction.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            leadId: input?.leadId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLeadAction(userId: string, leadActionId) {

    return this.data.leadAction.findUnique({ where: { id: leadActionId } , include: {lead: true}  })
  }

  async checkLeadActionExist(leadActionName: string) {
    try {
      return this.data.leadAction.findMany({ where: { name: leadActionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLeadAction(userId: string, input: UserCreateLeadActionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const leadActionData = await this.checkLeadActionExist(input.name)

        if (leadActionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'LeadAction', 'Create', input)

    let leadAction = await this.data.leadAction.create({
      data: { 
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadAction', 'Create', leadAction)

    return leadAction

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Lead Action')
    }

  }


  
  

  async userUpdateLeadAction(userId: string, leadActionId: string, input: UserUpdateLeadActionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!leadActionId) {
        throw new BadRequestException('Lead Action Id is required')
      } else {

      const leadActionData = await this.checkLeadActionExist(input.name)

      if (leadActionData.length > 0) {
        if (leadActionData[0].id != leadActionId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'LeadAction', 'Update', input)

    let leadAction = this.data.leadAction.update({
      where: { id: leadActionId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true} 
    })

    await this.data.logEvent(sendingUser, false, 'LeadAction', 'Update', leadAction)

    return leadAction

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Lead Action')
    }
  }

  async userUpdateLeadActions(userId: string, input: UserUpdateLeadActionsInput): Promise<UpdateResult> {
    const total = input.leadActions.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.leadActions) {
      const inputData = input.leadActions[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
leadId: inputData.leadId, 

      }

      const leadActionData = await this.checkLeadActionExist(inputData.name)

      if (leadActionData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.leadAction.upsert({
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


  async userDeleteLeadAction(userId: string, leadActionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!leadActionId) {
        throw new BadRequestException('Lead Action Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'LeadAction', 'Delete', leadActionId)

        let leadAction = this.data.leadAction.delete({
          where: { id: leadActionId }
        })

        await this.data.logEvent(sendingUser, false, 'LeadAction', 'Delete', leadAction)

        return leadAction

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Lead Action')
    }
  }
}

