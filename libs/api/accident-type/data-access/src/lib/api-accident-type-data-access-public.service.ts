
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAccidentTypeInput } from './dto/user-list-accident-type.input'

@Injectable()
export class ApiAccidentTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAccidentTypes(input?: UserListAccidentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accidentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAccidentTypes(input?: UserListAccidentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accidentType.findMany({
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

  async publicCountAccidentTypes(input?: UserListAccidentTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.accidentType.count(
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

  async publicAccidentType(accidentTypeId) {

    return this.data.accidentType.findUnique({ where: { id: accidentTypeId } , include: {legalCases: true, requiredFields: true}  })
  }
}


