
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAccidentTypeInput } from './dto/admin-create-accident-type.input'
import { AdminListAccidentTypeInput } from './dto/admin-list-accident-type.input'

import { AdminUpdateAccidentTypeInput } from './dto/admin-update-accident-type.input'

@Injectable()
export class ApiAccidentTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAccidentTypes(adminId: string, input?: AdminListAccidentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.accidentType.findMany({
      where: { 
        name: { 
            contains: name
        }
      },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAccidentTypes(adminId: string, input?: AdminListAccidentTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.accidentType.count({
      where: { 
        name: { 
            contains: name
        }
      }
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminAccidentType(adminId: string, accidentTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.accidentType.findUnique({ where: { id: accidentTypeId } , include: {legalCases: true, requiredFields: true} })
  }

  async checkAccidentTypeExist(accidentTypeName: string) {
    try {
      return this.data.accidentType.findMany({ where: { name: accidentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAccidentType(adminId: string, input: AdminCreateAccidentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const accidentTypeData = await this.checkAccidentTypeExist(input.name)

      if (accidentTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.accidentType.create({
          data: { 
            name: input.name, 
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

  async adminUpdateAccidentType(adminId: string, accidentTypeId, input: AdminUpdateAccidentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.accidentType.update({
      where: { id: accidentTypeId },
      data: {
        name: input.name, 
      }, 
      include: {
        legalCases: true, 
        requiredFields: true
      } 
    })
  }

  async adminDeleteAccidentType(adminId: string, accidentTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.accidentType.delete({ where: { id: accidentTypeId } })
  }
}

