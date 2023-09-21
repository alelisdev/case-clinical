
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAttorneyTypeInput } from './dto/user-list-attorney-type.input'

@Injectable()
export class ApiAttorneyTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAttorneyTypes(input?: UserListAttorneyTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAttorneyTypes(input?: UserListAttorneyTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyType.findMany({
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

  async publicCountAttorneyTypes(input?: UserListAttorneyTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyType.count(
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

  async publicAttorneyType(attorneyTypeId) {

    return this.data.attorneyType.findUnique({ where: { id: attorneyTypeId } , include: {attorneys: true}  })
  }
}


