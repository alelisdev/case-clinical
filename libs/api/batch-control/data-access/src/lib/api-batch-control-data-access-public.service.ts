
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListBatchControlInput } from './dto/user-list-batch-control.input'

@Injectable()
export class ApiBatchControlDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBatchControls(input?: UserListBatchControlInput) {
    let name = input?.name ? input.name : undefined

    return this.data.batchControl.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectBatchControls(input?: UserListBatchControlInput) {
    let name = input?.name ? input.name : undefined

    return this.data.batchControl.findMany({
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

  async publicCountBatchControls(input?: UserListBatchControlInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.batchControl.count(
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

  async publicBatchControl(batchControlId) {

    return this.data.batchControl.findUnique({ where: { id: batchControlId } , include: {payments: true}  })
  }
}


