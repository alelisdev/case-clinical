
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCasePreProblemInput } from './dto/user-list-case-pre-problem.input'

@Injectable()
export class ApiCasePreProblemDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCasePreProblems(input?: UserListCasePreProblemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProblem.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async publicSelectCasePreProblems(input?: UserListCasePreProblemInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProblem.findMany({
      where: {
            AND: [{
            name: { contains: name },
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

  async publicCountCasePreProblems(input?: UserListCasePreProblemInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProblem.count(
    {
      where: {
            AND: [{
            name: { contains: name },
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

  async publicCasePreProblem(casePreProblemId) {

    return this.data.casePreProblem.findUnique({ where: { id: casePreProblemId } , include: {legalCase: true}  })
  }
}


