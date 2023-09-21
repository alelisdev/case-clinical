
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListEligibilityStatusInput } from './dto/user-list-eligibility-status.input'

@Injectable()
export class ApiEligibilityStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicEligibilityStatuses(input?: UserListEligibilityStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectEligibilityStatuses(input?: UserListEligibilityStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityStatus.findMany({
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

  async publicCountEligibilityStatuses(input?: UserListEligibilityStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityStatus.count(
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

  async publicEligibilityStatus(eligibilityStatusId) {

    return this.data.eligibilityStatus.findUnique({ where: { id: eligibilityStatusId } , include: {eligibilityRequests: true}  })
  }
}


