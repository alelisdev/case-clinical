
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTagInput } from './dto/user-list-tag.input'

@Injectable()
export class ApiTagDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTags(input?: UserListTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.tag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectTags(input?: UserListTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.tag.findMany({
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

  async publicCountTags(input?: UserListTagInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.tag.count(
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

  async publicTag(tagId) {

    return this.data.tag.findUnique({ where: { id: tagId } , include: {clinicalProviderTags: true, taskTags: true}  })
  }
}


