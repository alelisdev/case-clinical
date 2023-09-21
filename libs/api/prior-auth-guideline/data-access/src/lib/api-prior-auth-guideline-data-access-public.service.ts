
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthGuidelineInput } from './dto/user-list-prior-auth-guideline.input'

@Injectable()
export class ApiPriorAuthGuidelineDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthGuidelines(input?: UserListPriorAuthGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthGuideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input.guidelineId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {guideline: true, priorAuthorizationRequest: true}
    })
  }

  async publicSelectPriorAuthGuidelines(input?: UserListPriorAuthGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthGuideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input.guidelineId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthGuidelines(input?: UserListPriorAuthGuidelineInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthGuideline.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input.guidelineId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthGuideline(priorAuthGuidelineId) {

    return this.data.priorAuthGuideline.findUnique({ where: { id: priorAuthGuidelineId } , include: {guideline: true, priorAuthorizationRequest: true}  })
  }
}


