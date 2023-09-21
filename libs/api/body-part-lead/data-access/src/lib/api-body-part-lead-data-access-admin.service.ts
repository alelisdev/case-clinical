
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateBodyPartLeadInput } from './dto/admin-create-body-part-lead.input'
import { AdminListBodyPartLeadInput } from './dto/admin-list-body-part-lead.input'
import { AdminListLeadInput } from '@case-clinical/api/lead/data-access'
import { AdminListBodyPartInput } from '@case-clinical/api/body-part/data-access'
import { AdminUpdateBodyPartLeadInput } from './dto/admin-update-body-part-lead.input'

@Injectable()
export class ApiBodyPartLeadDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminBodyPartLeads(adminId: string, input?: AdminListBodyPartLeadInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.bodyPartLead.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, bodyPart: true}
    })
  }

  async adminCountBodyPartLeads(adminId: string, input?: AdminListBodyPartLeadInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.bodyPartLead.count(
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

  
  

  async adminBodyPartLead(adminId: string, bodyPartLeadId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.bodyPartLead.findUnique({ where: { id: bodyPartLeadId } , include: {lead: true, bodyPart: true} })
  }

  async checkBodyPartLeadExist(bodyPartLeadName: string) {
    try {
      return this.data.bodyPartLead.findMany({ where: { name: bodyPartLeadName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateBodyPartLead(adminId: string, input: AdminCreateBodyPartLeadInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const bodyPartLeadData = await this.checkBodyPartLeadExist(input.name)

      if (bodyPartLeadData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.bodyPartLead.create({
          data: { 
      
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                bodyPart: 
                input.bodyPartId != null
                ? {
                        connect:  { 
                            id: input.bodyPartId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {lead: true, bodyPart: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateBodyPartLead(adminId: string, bodyPartLeadId, input: AdminUpdateBodyPartLeadInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bodyPartLead.update({
      where: { id: bodyPartLeadId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                bodyPart: 
                input.bodyPartId != null
                ? {
                        connect:  { 
                            id: input.bodyPartId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, bodyPart: true} 
    })
  }

  async adminDeleteBodyPartLead(adminId: string, bodyPartLeadId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.bodyPartLead.delete({ where: { id: bodyPartLeadId } })
  }
}

