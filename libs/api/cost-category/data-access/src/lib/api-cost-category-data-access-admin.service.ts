
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCostCategoryInput } from './dto/admin-create-cost-category.input'
import { AdminListCostCategoryInput } from './dto/admin-list-cost-category.input'

import { AdminUpdateCostCategoryInput } from './dto/admin-update-cost-category.input'

@Injectable()
export class ApiCostCategoryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCostCategories(adminId: string, input?: AdminListCostCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.costCategory.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountCostCategories(adminId: string, input?: AdminListCostCategoryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.costCategory.count(
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

  
  

  async adminCostCategory(adminId: string, costCategoryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.costCategory.findUnique({ where: { id: costCategoryId } , include: {priorAuthorizationProcedureCodes: true} })
  }

  async checkCostCategoryExist(costCategoryName: string) {
    try {
      return this.data.costCategory.findMany({ where: { name: costCategoryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCostCategory(adminId: string, input: AdminCreateCostCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const costCategoryData = await this.checkCostCategoryExist(input.name)

      if (costCategoryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.costCategory.create({
          data: { 
    name: input.name, 

    }
    , include: {priorAuthorizationProcedureCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCostCategory(adminId: string, costCategoryId, input: AdminUpdateCostCategoryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.costCategory.update({
      where: { id: costCategoryId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationProcedureCodes: true} 
    })
  }

  async adminDeleteCostCategory(adminId: string, costCategoryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.costCategory.delete({ where: { id: costCategoryId } })
  }
}

