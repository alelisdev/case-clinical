
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListFirmStatusInput } from './dto/user-list-firm-status.input'

@Injectable()
export class ApiFirmStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicFirmStatuses(input?: UserListFirmStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firmStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectFirmStatuses(input?: UserListFirmStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.firmStatus.findMany({
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

  async publicCountFirmStatuses(input?: UserListFirmStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.firmStatus.count(
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

  async publicFirmStatus(firmStatusId) {

    return this.data.firmStatus.findUnique({ where: { id: firmStatusId } , include: {firms: true}  })
  }
}


