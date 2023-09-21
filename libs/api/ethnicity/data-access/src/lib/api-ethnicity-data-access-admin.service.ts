
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateEthnicityInput } from './dto/admin-create-ethnicity.input'
import { AdminListEthnicityInput } from './dto/admin-list-ethnicity.input'

import { AdminUpdateEthnicityInput } from './dto/admin-update-ethnicity.input'

@Injectable()
export class ApiEthnicityDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEthnicities(adminId: string, input?: AdminListEthnicityInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.ethnicity.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountEthnicities(adminId: string, input?: AdminListEthnicityInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.ethnicity.count(
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

  
  

  async adminEthnicity(adminId: string, ethnicityId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.ethnicity.findUnique({ where: { id: ethnicityId } , include: {patients: true} })
  }

  async checkEthnicityExist(ethnicityName: string) {
    try {
      return this.data.ethnicity.findMany({ where: { name: ethnicityName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateEthnicity(adminId: string, input: AdminCreateEthnicityInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const ethnicityData = await this.checkEthnicityExist(input.name)

      if (ethnicityData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.ethnicity.create({
          data: { 
    name: input.name, 

    }
    , include: {patients: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateEthnicity(adminId: string, ethnicityId, input: AdminUpdateEthnicityInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.ethnicity.update({
      where: { id: ethnicityId },
      data: {
name: input.name, 

}
, include: {patients: true} 
    })
  }

  async adminDeleteEthnicity(adminId: string, ethnicityId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.ethnicity.delete({ where: { id: ethnicityId } })
  }
}

