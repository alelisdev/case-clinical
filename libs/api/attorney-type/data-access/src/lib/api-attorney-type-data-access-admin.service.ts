
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateAttorneyTypeInput } from './dto/admin-create-attorney-type.input'
import { AdminListAttorneyTypeInput } from './dto/admin-list-attorney-type.input'

import { AdminUpdateAttorneyTypeInput } from './dto/admin-update-attorney-type.input'

@Injectable()
export class ApiAttorneyTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAttorneyTypes(adminId: string, input?: AdminListAttorneyTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.attorneyType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountAttorneyTypes(adminId: string, input?: AdminListAttorneyTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyType.count(
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

  
  

  async adminAttorneyType(adminId: string, attorneyTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.attorneyType.findUnique({ where: { id: attorneyTypeId } , include: {attorneys: true} })
  }

  async checkAttorneyTypeExist(attorneyTypeName: string) {
    try {
      return this.data.attorneyType.findMany({ where: { name: attorneyTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateAttorneyType(adminId: string, input: AdminCreateAttorneyTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const attorneyTypeData = await this.checkAttorneyTypeExist(input.name)

      if (attorneyTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.attorneyType.create({
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

  async adminUpdateAttorneyType(adminId: string, attorneyTypeId, input: AdminUpdateAttorneyTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorneyType.update({
      where: { id: attorneyTypeId },
      data: {
name: input.name, 

}
, include: {attorneys: true} 
    })
  }

  async adminDeleteAttorneyType(adminId: string, attorneyTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.attorneyType.delete({ where: { id: attorneyTypeId } })
  }
}

