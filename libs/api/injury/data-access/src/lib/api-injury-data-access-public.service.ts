
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListInjuryInput } from './dto/user-list-injury.input'

@Injectable()
export class ApiInjuryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicInjuries(input?: UserListInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.injury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectInjuries(input?: UserListInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.injury.findMany({
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

  async publicCountInjuries(input?: UserListInjuryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.injury.count(
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

  async publicInjury(injuryId) {

    return this.data.injury.findUnique({ where: { id: injuryId } , include: {leads: true}  })
  }
}


