
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInsuranceSectorInput } from './dto/admin-create-insurance-sector.input'
import { AdminListInsuranceSectorInput } from './dto/admin-list-insurance-sector.input'

import { AdminUpdateInsuranceSectorInput } from './dto/admin-update-insurance-sector.input'

@Injectable()
export class ApiInsuranceSectorDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInsuranceSectors(adminId: string, input?: AdminListInsuranceSectorInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.insuranceSector.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountInsuranceSectors(adminId: string, input?: AdminListInsuranceSectorInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceSector.count(
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

  
  

  async adminInsuranceSector(adminId: string, insuranceSectorId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.insuranceSector.findUnique({ where: { id: insuranceSectorId } , include: {insurances: true} })
  }

  async checkInsuranceSectorExist(insuranceSectorName: string) {
    try {
      return this.data.insuranceSector.findMany({ where: { name: insuranceSectorName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInsuranceSector(adminId: string, input: AdminCreateInsuranceSectorInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const insuranceSectorData = await this.checkInsuranceSectorExist(input.name)

      if (insuranceSectorData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.insuranceSector.create({
          data: { 
    name: input.name, 

    }
    , include: {insurances: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateInsuranceSector(adminId: string, insuranceSectorId, input: AdminUpdateInsuranceSectorInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insuranceSector.update({
      where: { id: insuranceSectorId },
      data: {
name: input.name, 

}
, include: {insurances: true} 
    })
  }

  async adminDeleteInsuranceSector(adminId: string, insuranceSectorId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insuranceSector.delete({ where: { id: insuranceSectorId } })
  }
}

