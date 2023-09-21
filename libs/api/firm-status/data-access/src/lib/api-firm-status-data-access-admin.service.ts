
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateFirmStatusInput } from './dto/admin-create-firm-status.input'
import { AdminListFirmStatusInput } from './dto/admin-list-firm-status.input'

import { AdminUpdateFirmStatusInput } from './dto/admin-update-firm-status.input'

@Injectable()
export class ApiFirmStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFirmStatuses(adminId: string, input?: AdminListFirmStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.firmStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountFirmStatuses(adminId: string, input?: AdminListFirmStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.firmStatus.count(
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

  
  

  async adminFirmStatus(adminId: string, firmStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.firmStatus.findUnique({ where: { id: firmStatusId } , include: {firms: true} })
  }

  async checkFirmStatusExist(firmStatusName: string) {
    try {
      return this.data.firmStatus.findMany({ where: { name: firmStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateFirmStatus(adminId: string, input: AdminCreateFirmStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const firmStatusData = await this.checkFirmStatusExist(input.name)

      if (firmStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.firmStatus.create({
          data: { 
    name: input.name, 
blackListed: input.blackListed, 
active: input.active, 
statusColor: input.statusColor, 

    }
    , include: {firms: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateFirmStatus(adminId: string, firmStatusId, input: AdminUpdateFirmStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.firmStatus.update({
      where: { id: firmStatusId },
      data: {
name: input.name, 
blackListed: input.blackListed, 
active: input.active, 
statusColor: input.statusColor, 

}
, include: {firms: true} 
    })
  }

  async adminDeleteFirmStatus(adminId: string, firmStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.firmStatus.delete({ where: { id: firmStatusId } })
  }
}

