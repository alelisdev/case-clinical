
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseStatusInput } from './dto/admin-create-case-status.input'
import { AdminListCaseStatusInput } from './dto/admin-list-case-status.input'

import { AdminUpdateCaseStatusInput } from './dto/admin-update-case-status.input'

@Injectable()
export class ApiCaseStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseStatuses(adminId: string, input?: AdminListCaseStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.caseStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCaseStatuses(adminId: string, input?: AdminListCaseStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseStatus.count(
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

  
  

  async adminCaseStatus(adminId: string, caseStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseStatus.findUnique({ where: { id: caseStatusId } , include: {legalCases: true} })
  }

  async checkCaseStatusExist(caseStatusName: string) {
    try {
      return this.data.caseStatus.findMany({ where: { name: caseStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseStatus(adminId: string, input: AdminCreateCaseStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseStatusData = await this.checkCaseStatusExist(input.name)

      if (caseStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseStatus.create({
          data: { 
    name: input.name, 
orderIndex: input.orderIndex, 
color: input.color, 
isDefault: input.isDefault, 
tickerDate: input.tickerDate, 
maxTickerDate: input.maxTickerDate, 
moveDocs: input.moveDocs, 
dateCreated: input.dateCreated, 
removed: input.removed, 
createdBy: input.createdBy, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

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

  async adminUpdateCaseStatus(adminId: string, caseStatusId, input: AdminUpdateCaseStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseStatus.update({
      where: { id: caseStatusId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
color: input.color, 
isDefault: input.isDefault, 
tickerDate: input.tickerDate, 
maxTickerDate: input.maxTickerDate, 
moveDocs: input.moveDocs, 
dateCreated: input.dateCreated, 
removed: input.removed, 
createdBy: input.createdBy, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: true} 
    })
  }

  async adminDeleteCaseStatus(adminId: string, caseStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseStatus.delete({ where: { id: caseStatusId } })
  }
}

