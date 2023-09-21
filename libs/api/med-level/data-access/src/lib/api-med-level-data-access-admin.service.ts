
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateMedLevelInput } from './dto/admin-create-med-level.input'
import { AdminListMedLevelInput } from './dto/admin-list-med-level.input'

import { AdminUpdateMedLevelInput } from './dto/admin-update-med-level.input'

@Injectable()
export class ApiMedLevelDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMedLevels(adminId: string, input?: AdminListMedLevelInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.medLevel.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountMedLevels(adminId: string, input?: AdminListMedLevelInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.medLevel.count(
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

  
  

  async adminMedLevel(adminId: string, medLevelId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.medLevel.findUnique({ where: { id: medLevelId } , include: {legalCases: true, requiredFields: true} })
  }

  async checkMedLevelExist(medLevelName: string) {
    try {
      return this.data.medLevel.findMany({ where: { name: medLevelName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateMedLevel(adminId: string, input: AdminCreateMedLevelInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const medLevelData = await this.checkMedLevelExist(input.name)

      if (medLevelData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.medLevel.create({
          data: { 
    name: input.name, 
approvedSiteCosts: input.approvedSiteCosts, 
maximumMedicalBillsToDate: input.maximumMedicalBillsToDate, 

    }
    , include: {legalCases: true, requiredFields: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateMedLevel(adminId: string, medLevelId, input: AdminUpdateMedLevelInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medLevel.update({
      where: { id: medLevelId },
      data: {
name: input.name, 
approvedSiteCosts: input.approvedSiteCosts, 
maximumMedicalBillsToDate: input.maximumMedicalBillsToDate, 

}
, include: {legalCases: true, requiredFields: true} 
    })
  }

  async adminDeleteMedLevel(adminId: string, medLevelId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medLevel.delete({ where: { id: medLevelId } })
  }
}

