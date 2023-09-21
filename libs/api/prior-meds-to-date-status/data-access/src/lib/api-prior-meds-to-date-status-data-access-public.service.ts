
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorMedsToDateStatusInput } from './dto/user-list-prior-meds-to-date-status.input'

@Injectable()
export class ApiPriorMedsToDateStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorMedsToDateStatuses(input?: UserListPriorMedsToDateStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDateStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPriorMedsToDateStatuses(input?: UserListPriorMedsToDateStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDateStatus.findMany({
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

  async publicCountPriorMedsToDateStatuses(input?: UserListPriorMedsToDateStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDateStatus.count(
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

  async publicPriorMedsToDateStatus(priorMedsToDateStatusId) {

    return this.data.priorMedsToDateStatus.findUnique({ where: { id: priorMedsToDateStatusId } , include: {priorMedsToDates: true}  })
  }
}


