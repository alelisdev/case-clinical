
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAttorneyStatusInput } from './dto/admin-create-attorney-status.input'
import { AdminListAttorneyStatusInput } from './dto/admin-list-attorney-status.input'

import { AdminUpdateAttorneyStatusInput } from './dto/admin-update-attorney-status.input'

@Injectable()
export class ApiAttorneyStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAttorneyStatuses(adminId: string, input?: AdminListAttorneyStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.attorneyStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAttorneyStatuses(adminId: string, input?: AdminListAttorneyStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyStatus.count(
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

  
  

  async adminAttorneyStatus(adminId: string, attorneyStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.attorneyStatus.findUnique({ where: { id: attorneyStatusId } , include: {attorneys: true} })
  }

  async checkAttorneyStatusExist(attorneyStatusName: string) {
    try {
      return this.data.attorneyStatus.findMany({ where: { name: attorneyStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAttorneyStatus(adminId: string, input: AdminCreateAttorneyStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const attorneyStatusData = await this.checkAttorneyStatusExist(input.name)

      if (attorneyStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.attorneyStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {attorneys: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateAttorneyStatus(adminId: string, attorneyStatusId, input: AdminUpdateAttorneyStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorneyStatus.update({
      where: { id: attorneyStatusId },
      data: {
name: input.name, 

}
, include: {attorneys: true} 
    })
  }

  async adminDeleteAttorneyStatus(adminId: string, attorneyStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorneyStatus.delete({ where: { id: attorneyStatusId } })
  }
}

