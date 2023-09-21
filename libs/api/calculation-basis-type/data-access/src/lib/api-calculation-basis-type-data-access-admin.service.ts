
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCalculationBasisTypeInput } from './dto/admin-create-calculation-basis-type.input'
import { AdminListCalculationBasisTypeInput } from './dto/admin-list-calculation-basis-type.input'

import { AdminUpdateCalculationBasisTypeInput } from './dto/admin-update-calculation-basis-type.input'

@Injectable()
export class ApiCalculationBasisTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCalculationBasisTypes(adminId: string, input?: AdminListCalculationBasisTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.calculationBasisType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCalculationBasisTypes(adminId: string, input?: AdminListCalculationBasisTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.calculationBasisType.count(
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

  
  

  async adminCalculationBasisType(adminId: string, calculationBasisTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.calculationBasisType.findUnique({ where: { id: calculationBasisTypeId } , include: {contracts: true} })
  }

  async checkCalculationBasisTypeExist(calculationBasisTypeName: string) {
    try {
      return this.data.calculationBasisType.findMany({ where: { name: calculationBasisTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCalculationBasisType(adminId: string, input: AdminCreateCalculationBasisTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const calculationBasisTypeData = await this.checkCalculationBasisTypeExist(input.name)

      if (calculationBasisTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.calculationBasisType.create({
          data: { 
    name: input.name, 

    }
    , include: {contracts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCalculationBasisType(adminId: string, calculationBasisTypeId, input: AdminUpdateCalculationBasisTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calculationBasisType.update({
      where: { id: calculationBasisTypeId },
      data: {
name: input.name, 

}
, include: {contracts: true} 
    })
  }

  async adminDeleteCalculationBasisType(adminId: string, calculationBasisTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.calculationBasisType.delete({ where: { id: calculationBasisTypeId } })
  }
}

