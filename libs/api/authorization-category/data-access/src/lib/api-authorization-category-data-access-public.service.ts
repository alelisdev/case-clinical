
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationCategoryInput } from './dto/user-list-authorization-category.input'

@Injectable()
export class ApiAuthorizationCategoryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizationCategories(input?: UserListAuthorizationCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAuthorizationCategories(input?: UserListAuthorizationCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationCategory.findMany({
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

  async publicCountAuthorizationCategories(input?: UserListAuthorizationCategoryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationCategory.count(
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

  async publicAuthorizationCategory(authorizationCategoryId) {

    return this.data.authorizationCategory.findUnique({ where: { id: authorizationCategoryId } , include: {authorizations: true}  })
  }
}


