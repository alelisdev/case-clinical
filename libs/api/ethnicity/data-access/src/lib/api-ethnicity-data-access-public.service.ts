
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListEthnicityInput } from './dto/user-list-ethnicity.input'

@Injectable()
export class ApiEthnicityDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicEthnicities(input?: UserListEthnicityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.ethnicity.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectEthnicities(input?: UserListEthnicityInput) {
    let name = input?.name ? input.name : undefined

    return this.data.ethnicity.findMany({
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

  async publicCountEthnicities(input?: UserListEthnicityInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.ethnicity.count(
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

  async publicEthnicity(ethnicityId) {

    return this.data.ethnicity.findUnique({ where: { id: ethnicityId } , include: {patients: true}  })
  }
}


