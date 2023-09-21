
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateWriteOffStatusInput } from './dto/admin-create-write-off-status.input'
import { AdminListWriteOffStatusInput } from './dto/admin-list-write-off-status.input'

import { AdminUpdateWriteOffStatusInput } from './dto/admin-update-write-off-status.input'

@Injectable()
export class ApiWriteOffStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminWriteOffStatuses(adminId: string, input?: AdminListWriteOffStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.writeOffStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountWriteOffStatuses(adminId: string, input?: AdminListWriteOffStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.writeOffStatus.count(
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

  
  

  async adminWriteOffStatus(adminId: string, writeOffStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.writeOffStatus.findUnique({ where: { id: writeOffStatusId } , include: {writeOffs: true} })
  }

  async checkWriteOffStatusExist(writeOffStatusName: string) {
    try {
      return this.data.writeOffStatus.findMany({ where: { name: writeOffStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateWriteOffStatus(adminId: string, input: AdminCreateWriteOffStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const writeOffStatusData = await this.checkWriteOffStatusExist(input.name)

      if (writeOffStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.writeOffStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {writeOffs: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateWriteOffStatus(adminId: string, writeOffStatusId, input: AdminUpdateWriteOffStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.writeOffStatus.update({
      where: { id: writeOffStatusId },
      data: {
name: input.name, 

}
, include: {writeOffs: true} 
    })
  }

  async adminDeleteWriteOffStatus(adminId: string, writeOffStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.writeOffStatus.delete({ where: { id: writeOffStatusId } })
  }
}

