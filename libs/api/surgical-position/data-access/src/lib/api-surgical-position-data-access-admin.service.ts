
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateSurgicalPositionInput } from './dto/admin-create-surgical-position.input'
import { AdminListSurgicalPositionInput } from './dto/admin-list-surgical-position.input'

import { AdminUpdateSurgicalPositionInput } from './dto/admin-update-surgical-position.input'

@Injectable()
export class ApiSurgicalPositionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminSurgicalPositions(adminId: string, input?: AdminListSurgicalPositionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.surgicalPosition.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountSurgicalPositions(adminId: string, input?: AdminListSurgicalPositionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.surgicalPosition.count(
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

  
  

  async adminSurgicalPosition(adminId: string, surgicalPositionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.surgicalPosition.findUnique({ where: { id: surgicalPositionId } , include: {priorAuthorizationRequests: true} })
  }

  async checkSurgicalPositionExist(surgicalPositionName: string) {
    try {
      return this.data.surgicalPosition.findMany({ where: { name: surgicalPositionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateSurgicalPosition(adminId: string, input: AdminCreateSurgicalPositionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const surgicalPositionData = await this.checkSurgicalPositionExist(input.name)

      if (surgicalPositionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.surgicalPosition.create({
          data: { 
    name: input.name, 

    }
    , include: {priorAuthorizationRequests: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateSurgicalPosition(adminId: string, surgicalPositionId, input: AdminUpdateSurgicalPositionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.surgicalPosition.update({
      where: { id: surgicalPositionId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })
  }

  async adminDeleteSurgicalPosition(adminId: string, surgicalPositionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.surgicalPosition.delete({ where: { id: surgicalPositionId } })
  }
}

