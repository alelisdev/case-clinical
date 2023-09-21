
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadInjuryInput } from './dto/admin-create-lead-injury.input'
import { AdminListLeadInjuryInput } from './dto/admin-list-lead-injury.input'
import { AdminListLeadInput } from '@case-clinical/api/lead/data-access'
import { AdminListSeverityInput } from '@case-clinical/api/severity/data-access'
import { AdminUpdateLeadInjuryInput } from './dto/admin-update-lead-injury.input'

@Injectable()
export class ApiLeadInjuryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeadInjuries(adminId: string, input?: AdminListLeadInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.leadInjury.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, severity: true}
    })
  }

  async adminCountLeadInjuries(adminId: string, input?: AdminListLeadInjuryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadInjury.count(
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

  
  

  async adminLeadInjury(adminId: string, leadInjuryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.leadInjury.findUnique({ where: { id: leadInjuryId } , include: {injuries: true, lead: true, severity: true} })
  }

  async checkLeadInjuryExist(leadInjuryName: string) {
    try {
      return this.data.leadInjury.findMany({ where: { name: leadInjuryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLeadInjury(adminId: string, input: AdminCreateLeadInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadInjuryData = await this.checkLeadInjuryExist(input.name)

      if (leadInjuryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.leadInjury.create({
          data: { 
      
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                severity: 
                input.severityId != null
                ? {
                        connect:  { 
                            id: input.severityId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {injuries: true, lead: true, severity: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLeadInjury(adminId: string, leadInjuryId, input: AdminUpdateLeadInjuryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadInjury.update({
      where: { id: leadInjuryId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                severity: 
                input.severityId != null
                ? {
                        connect:  { 
                            id: input.severityId
                        }
                    }: undefined,name: input.name, 

}
, include: {injuries: true, lead: true, severity: true} 
    })
  }

  async adminDeleteLeadInjury(adminId: string, leadInjuryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadInjury.delete({ where: { id: leadInjuryId } })
  }
}

