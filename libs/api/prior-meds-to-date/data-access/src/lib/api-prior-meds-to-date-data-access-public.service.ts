
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorMedsToDateInput } from './dto/user-list-prior-meds-to-date.input'

@Injectable()
export class ApiPriorMedsToDateDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorMedsToDates(input?: UserListPriorMedsToDateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
priorMedsToDateStatusId: input.priorMedsToDateStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, priorMedsToDateStatus: true}
    })
  }

  async publicSelectPriorMedsToDates(input?: UserListPriorMedsToDateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorMedsToDate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
priorMedsToDateStatusId: input.priorMedsToDateStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorMedsToDates(input?: UserListPriorMedsToDateInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorMedsToDate.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
priorMedsToDateStatusId: input.priorMedsToDateStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorMedsToDate(priorMedsToDateId) {

    return this.data.priorMedsToDate.findUnique({ where: { id: priorMedsToDateId } , include: {legalCase: true, priorMedsToDateStatus: true}  })
  }
}


