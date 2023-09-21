
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLeadSourceInput } from './dto/admin-create-lead-source.input'
import { AdminListLeadSourceInput } from './dto/admin-list-lead-source.input'

import { AdminUpdateLeadSourceInput } from './dto/admin-update-lead-source.input'

@Injectable()
export class ApiLeadSourceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLeadSources(adminId: string, input?: AdminListLeadSourceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.leadSource.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountLeadSources(adminId: string, input?: AdminListLeadSourceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.leadSource.count(
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

  
  

  async adminLeadSource(adminId: string, leadSourceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.leadSource.findUnique({ where: { id: leadSourceId } , include: {leads: true} })
  }

  async checkLeadSourceExist(leadSourceName: string) {
    try {
      return this.data.leadSource.findMany({ where: { name: leadSourceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLeadSource(adminId: string, input: AdminCreateLeadSourceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const leadSourceData = await this.checkLeadSourceExist(input.name)

      if (leadSourceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.leadSource.create({
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

  async adminUpdateLeadSource(adminId: string, leadSourceId, input: AdminUpdateLeadSourceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadSource.update({
      where: { id: leadSourceId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteLeadSource(adminId: string, leadSourceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.leadSource.delete({ where: { id: leadSourceId } })
  }
}

