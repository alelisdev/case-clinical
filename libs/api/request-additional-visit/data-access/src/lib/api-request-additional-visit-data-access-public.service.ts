
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListRequestAdditionalVisitInput } from './dto/user-list-request-additional-visit.input'

@Injectable()
export class ApiRequestAdditionalVisitDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicRequestAdditionalVisits(input?: UserListRequestAdditionalVisitInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requestAdditionalVisit.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, legalCase: true}
    })
  }

  async publicSelectRequestAdditionalVisits(input?: UserListRequestAdditionalVisitInput) {
    let name = input?.name ? input.name : undefined

    return this.data.requestAdditionalVisit.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountRequestAdditionalVisits(input?: UserListRequestAdditionalVisitInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.requestAdditionalVisit.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
legalCaseId: input.legalCaseId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicRequestAdditionalVisit(requestAdditionalVisitId) {

    return this.data.requestAdditionalVisit.findUnique({ where: { id: requestAdditionalVisitId } , include: {patient: true, legalCase: true}  })
  }
}


