
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseTypeInput } from './dto/admin-create-case-type.input'
import { AdminListCaseTypeInput } from './dto/admin-list-case-type.input'

import { AdminUpdateCaseTypeInput } from './dto/admin-update-case-type.input'

@Injectable()
export class ApiCaseTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseTypes(adminId: string, input?: AdminListCaseTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.caseType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCaseTypes(adminId: string, input?: AdminListCaseTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseType.count(
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

  
  

  async adminCaseType(adminId: string, caseTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseType.findUnique({ where: { id: caseTypeId } , include: {legalCases: true} })
  }

  async checkCaseTypeExist(caseTypeName: string) {
    try {
      return this.data.caseType.findMany({ where: { name: caseTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseType(adminId: string, input: AdminCreateCaseTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseTypeData = await this.checkCaseTypeExist(input.name)

      if (caseTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseType.create({
          data: { 
    name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
removed: input.removed, 
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

  async adminUpdateCaseType(adminId: string, caseTypeId, input: AdminUpdateCaseTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseType.update({
      where: { id: caseTypeId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
removed: input.removed, 
migSource: input.migSource, 
entity: input.entity, 
temp: input.temp, 

}
, include: {legalCases: true} 
    })
  }

  async adminDeleteCaseType(adminId: string, caseTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseType.delete({ where: { id: caseTypeId } })
  }
}

