
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListImplantCategoryInput } from './dto/user-list-implant-category.input'

@Injectable()
export class ApiImplantCategoryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicImplantCategories(input?: UserListImplantCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implantCategory.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectImplantCategories(input?: UserListImplantCategoryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.implantCategory.findMany({
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

  async publicCountImplantCategories(input?: UserListImplantCategoryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.implantCategory.count(
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

  async publicImplantCategory(implantCategoryId) {

    return this.data.implantCategory.findUnique({ where: { id: implantCategoryId } , include: {implants: true}  })
  }
}


