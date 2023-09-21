
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCategoryInput } from './dto/user-list-category.input'

@Injectable()
export class ApiCategoryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCategories(input?: UserListCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.category.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCategories(input?: UserListCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.category.findMany({
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

  async publicCountCategories(input?: UserListCategoryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.category.count(
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

  async publicCategory(categoryId) {

    return this.data.category.findUnique({ where: { id: categoryId } , include: {authorizationKinds: true}  })
  }
}


