
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorMedsToDateStatusInput } from './dto/admin-create-prior-meds-to-date-status.input'
import { AdminListPriorMedsToDateStatusInput } from './dto/admin-list-prior-meds-to-date-status.input'

import { AdminUpdatePriorMedsToDateStatusInput } from './dto/admin-update-prior-meds-to-date-status.input'

@Injectable()
export class ApiPriorMedsToDateStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorMedsToDateStatuses(adminId: string, input?: AdminListPriorMedsToDateStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDateStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPriorMedsToDateStatuses(adminId: string, input?: AdminListPriorMedsToDateStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDateStatus.count(
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

  
  

  async adminPriorMedsToDateStatus(adminId: string, priorMedsToDateStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorMedsToDateStatus.findUnique({ where: { id: priorMedsToDateStatusId } , include: {priorMedsToDates: true} })
  }

  async checkPriorMedsToDateStatusExist(priorMedsToDateStatusName: string) {
    try {
      return this.data.priorMedsToDateStatus.findMany({ where: { name: priorMedsToDateStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorMedsToDateStatus(adminId: string, input: AdminCreatePriorMedsToDateStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorMedsToDateStatusData = await this.checkPriorMedsToDateStatusExist(input.name)

      if (priorMedsToDateStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorMedsToDateStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {priorMedsToDates: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorMedsToDateStatus(adminId: string, priorMedsToDateStatusId, input: AdminUpdatePriorMedsToDateStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorMedsToDateStatus.update({
      where: { id: priorMedsToDateStatusId },
      data: {
name: input.name, 

}
, include: {priorMedsToDates: true} 
    })
  }

  async adminDeletePriorMedsToDateStatus(adminId: string, priorMedsToDateStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorMedsToDateStatus.delete({ where: { id: priorMedsToDateStatusId } })
  }
}

