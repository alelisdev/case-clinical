
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListWriteOffStatusInput } from './dto/user-list-write-off-status.input'

@Injectable()
export class ApiWriteOffStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicWriteOffStatuses(input?: UserListWriteOffStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOffStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectWriteOffStatuses(input?: UserListWriteOffStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOffStatus.findMany({
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

  async publicCountWriteOffStatuses(input?: UserListWriteOffStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.writeOffStatus.count(
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

  async publicWriteOffStatus(writeOffStatusId) {

    return this.data.writeOffStatus.findUnique({ where: { id: writeOffStatusId } , include: {writeOffs: true}  })
  }
}


