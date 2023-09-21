
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseProgressStatusInput } from './dto/admin-create-case-progress-status.input'
import { AdminListCaseProgressStatusInput } from './dto/admin-list-case-progress-status.input'

import { AdminUpdateCaseProgressStatusInput } from './dto/admin-update-case-progress-status.input'

@Injectable()
export class ApiCaseProgressStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseProgressStatuses(adminId: string, input?: AdminListCaseProgressStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.caseProgressStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCaseProgressStatuses(adminId: string, input?: AdminListCaseProgressStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseProgressStatus.count(
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

  
  

  async adminCaseProgressStatus(adminId: string, caseProgressStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseProgressStatus.findUnique({ where: { id: caseProgressStatusId } , include: {legalCases: true} })
  }

  async checkCaseProgressStatusExist(caseProgressStatusName: string) {
    try {
      return this.data.caseProgressStatus.findMany({ where: { name: caseProgressStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseProgressStatus(adminId: string, input: AdminCreateCaseProgressStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseProgressStatusData = await this.checkCaseProgressStatusExist(input.name)

      if (caseProgressStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseProgressStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {legalCases: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCaseProgressStatus(adminId: string, caseProgressStatusId, input: AdminUpdateCaseProgressStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseProgressStatus.update({
      where: { id: caseProgressStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })
  }

  async adminDeleteCaseProgressStatus(adminId: string, caseProgressStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseProgressStatus.delete({ where: { id: caseProgressStatusId } })
  }
}

