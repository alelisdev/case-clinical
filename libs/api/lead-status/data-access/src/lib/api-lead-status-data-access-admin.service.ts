
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadStatusInput } from './dto/admin-create-lead-status.input'
import { AdminListLeadStatusInput } from './dto/admin-list-lead-status.input'

import { AdminUpdateLeadStatusInput } from './dto/admin-update-lead-status.input'

@Injectable()
export class ApiLeadStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeadStatuses(adminId: string, input?: AdminListLeadStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.leadStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountLeadStatuses(adminId: string, input?: AdminListLeadStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadStatus.count(
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

  
  

  async adminLeadStatus(adminId: string, leadStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.leadStatus.findUnique({ where: { id: leadStatusId } , include: {leads: true} })
  }

  async checkLeadStatusExist(leadStatusName: string) {
    try {
      return this.data.leadStatus.findMany({ where: { name: leadStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLeadStatus(adminId: string, input: AdminCreateLeadStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadStatusData = await this.checkLeadStatusExist(input.name)

      if (leadStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.leadStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {leads: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLeadStatus(adminId: string, leadStatusId, input: AdminUpdateLeadStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadStatus.update({
      where: { id: leadStatusId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteLeadStatus(adminId: string, leadStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadStatus.delete({ where: { id: leadStatusId } })
  }
}

