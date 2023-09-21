
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListEligibilityRequestInput } from './dto/user-list-eligibility-request.input'

@Injectable()
export class ApiEligibilityRequestDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicEligibilityRequests(input?: UserListEligibilityRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {elegibilityStatus: true}
    })
  }

  async publicSelectEligibilityRequests(input?: UserListEligibilityRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.eligibilityRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountEligibilityRequests(input?: UserListEligibilityRequestInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.eligibilityRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            eligibilityStatusId: input.eligibilityStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicEligibilityRequest(eligibilityRequestId) {

    return this.data.eligibilityRequest.findUnique({ where: { id: eligibilityRequestId } , include: {elegibilityStatus: true}  })
  }
}


