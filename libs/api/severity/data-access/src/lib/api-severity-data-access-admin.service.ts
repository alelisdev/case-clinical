
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateSeverityInput } from './dto/admin-create-severity.input'
import { AdminListSeverityInput } from './dto/admin-list-severity.input'

import { AdminUpdateSeverityInput } from './dto/admin-update-severity.input'

@Injectable()
export class ApiSeverityDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSeverities(adminId: string, input?: AdminListSeverityInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.severity.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountSeverities(adminId: string, input?: AdminListSeverityInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.severity.count(
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

  
  

  async adminSeverity(adminId: string, severityId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.severity.findUnique({ where: { id: severityId } , include: {leads: true} })
  }

  async checkSeverityExist(severityName: string) {
    try {
      return this.data.severity.findMany({ where: { name: severityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateSeverity(adminId: string, input: AdminCreateSeverityInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const severityData = await this.checkSeverityExist(input.name)

      if (severityData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.severity.create({
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

  async adminUpdateSeverity(adminId: string, severityId, input: AdminUpdateSeverityInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.severity.update({
      where: { id: severityId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteSeverity(adminId: string, severityId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.severity.delete({ where: { id: severityId } })
  }
}

