
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadActionInput } from './dto/admin-create-lead-action.input'
import { AdminListLeadActionInput } from './dto/admin-list-lead-action.input'
import { AdminListLeadInput } from '@case-clinical/api/lead/data-access'
import { AdminUpdateLeadActionInput } from './dto/admin-update-lead-action.input'

@Injectable()
export class ApiLeadActionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeadActions(adminId: string, input?: AdminListLeadActionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.leadAction.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true}
    })
  }

  async adminCountLeadActions(adminId: string, input?: AdminListLeadActionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadAction.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminLeadAction(adminId: string, leadActionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.leadAction.findUnique({ where: { id: leadActionId } , include: {lead: true} })
  }

  async checkLeadActionExist(leadActionName: string) {
    try {
      return this.data.leadAction.findMany({ where: { name: leadActionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLeadAction(adminId: string, input: AdminCreateLeadActionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadActionData = await this.checkLeadActionExist(input.name)

      if (leadActionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.leadAction.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLeadAction(adminId: string, leadActionId, input: AdminUpdateLeadActionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadAction.update({
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
  }

  async adminDeleteLeadAction(adminId: string, leadActionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadAction.delete({ where: { id: leadActionId } })
  }
}

