
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcessInput } from './dto/user-list-process.input'

@Injectable()
export class ApiProcessDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcesses(input?: UserListProcessInput) {
    let name = input?.name ? input.name : undefined

    return this.data.process.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcesses(input?: UserListProcessInput) {
    let name = input?.name ? input.name : undefined

    return this.data.process.findMany({
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

  async publicCountProcesses(input?: UserListProcessInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.process.count(
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

  async publicProcess(processId) {

    return this.data.process.findUnique({ where: { id: processId } , include: {contracts: true}  })
  }
}


