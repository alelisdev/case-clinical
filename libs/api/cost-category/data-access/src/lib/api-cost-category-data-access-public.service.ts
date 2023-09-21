
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCostCategoryInput } from './dto/user-list-cost-category.input'

@Injectable()
export class ApiCostCategoryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCostCategories(input?: UserListCostCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.costCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCostCategories(input?: UserListCostCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.costCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCostCategories(input?: UserListCostCategoryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.costCategory.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCostCategory(costCategoryId) {

    return this.data.costCategory.findUnique({ where: { id: costCategoryId } , include: {priorAuthorizationProcedureCodes: true}  })
  }
}


