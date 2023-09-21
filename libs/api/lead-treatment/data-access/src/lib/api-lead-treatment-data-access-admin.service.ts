
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadTreatmentInput } from './dto/admin-create-lead-treatment.input'
import { AdminListLeadTreatmentInput } from './dto/admin-list-lead-treatment.input'
import { AdminListLeadInput } from '@case-clinical/api/lead/data-access'
import { AdminListTreatmentInput } from '@case-clinical/api/treatment/data-access'
import { AdminUpdateLeadTreatmentInput } from './dto/admin-update-lead-treatment.input'

@Injectable()
export class ApiLeadTreatmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeadTreatments(adminId: string, input?: AdminListLeadTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.leadTreatment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {lead: true, treatment: true}
    })
  }

  async adminCountLeadTreatments(adminId: string, input?: AdminListLeadTreatmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadTreatment.count(
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

  
  

  async adminLeadTreatment(adminId: string, leadTreatmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.leadTreatment.findUnique({ where: { id: leadTreatmentId } , include: {lead: true, treatment: true} })
  }

  async checkLeadTreatmentExist(leadTreatmentName: string) {
    try {
      return this.data.leadTreatment.findMany({ where: { name: leadTreatmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLeadTreatment(adminId: string, input: AdminCreateLeadTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadTreatmentData = await this.checkLeadTreatmentExist(input.name)

      if (leadTreatmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.leadTreatment.create({
          data: { 
      
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                treatment: 
                input.treatmentId != null
                ? {
                        connect:  { 
                            id: input.treatmentId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {lead: true, treatment: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLeadTreatment(adminId: string, leadTreatmentId, input: AdminUpdateLeadTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadTreatment.update({
      where: { id: leadTreatmentId },
      data: {
  
                lead: 
                input.leadId != null
                ? {
                        connect:  { 
                            id: input.leadId
                        }
                    }: undefined,  
                treatment: 
                input.treatmentId != null
                ? {
                        connect:  { 
                            id: input.treatmentId
                        }
                    }: undefined,name: input.name, 

}
, include: {lead: true, treatment: true} 
    })
  }

  async adminDeleteLeadTreatment(adminId: string, leadTreatmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadTreatment.delete({ where: { id: leadTreatmentId } })
  }
}

