
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateInsuranceTypeInput } from './dto/admin-create-insurance-type.input'
import { AdminListInsuranceTypeInput } from './dto/admin-list-insurance-type.input'

import { AdminUpdateInsuranceTypeInput } from './dto/admin-update-insurance-type.input'

@Injectable()
export class ApiInsuranceTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminInsuranceTypes(adminId: string, input?: AdminListInsuranceTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.insuranceType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountInsuranceTypes(adminId: string, input?: AdminListInsuranceTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.insuranceType.count(
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

  
  

  async adminInsuranceType(adminId: string, insuranceTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.insuranceType.findUnique({ where: { id: insuranceTypeId } , include: {insurances: true} })
  }

  async checkInsuranceTypeExist(insuranceTypeName: string) {
    try {
      return this.data.insuranceType.findMany({ where: { name: insuranceTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateInsuranceType(adminId: string, input: AdminCreateInsuranceTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const insuranceTypeData = await this.checkInsuranceTypeExist(input.name)

      if (insuranceTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.insuranceType.create({
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

  async adminUpdateInsuranceType(adminId: string, insuranceTypeId, input: AdminUpdateInsuranceTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insuranceType.update({
      where: { id: insuranceTypeId },
      data: {
name: input.name, 

}
, include: {insurances: true} 
    })
  }

  async adminDeleteInsuranceType(adminId: string, insuranceTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.insuranceType.delete({ where: { id: insuranceTypeId } })
  }
}

