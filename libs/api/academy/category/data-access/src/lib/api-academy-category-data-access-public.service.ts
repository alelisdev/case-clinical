
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput  } from '@case-clinical/api/core/data-access'
import { UserListAcademyCategoryInput } from './dto/user-list-academy-category.input'

@Injectable()
export class ApiAcademyCategoryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAcademyCategories(input?: UserListAcademyCategoryInput) {

    return this.data.academyCategory.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip , include: {courses: true}
    })
  }

  async publicSelectAcademyCategories(input?: UserListAcademyCategoryInput) {
    return this.data.academyCategory.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async publicCountAcademyCategories(input?: UserListAcademyCategoryInput): Promise<CorePaging> {

    const total = await this.data.academyCategory.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async publicAcademyCategory(academyCategoryId) {

    return this.data.academyCategory.findUnique({ where: { id: academyCategoryId } , include: {courses: true}  })
  }
}


