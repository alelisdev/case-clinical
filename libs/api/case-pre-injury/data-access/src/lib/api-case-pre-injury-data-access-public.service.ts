
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCasePreInjuryInput } from './dto/user-list-case-pre-injury.input'

@Injectable()
export class ApiCasePreInjuryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCasePreInjuries(input?: UserListCasePreInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreInjury.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async publicSelectCasePreInjuries(input?: UserListCasePreInjuryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreInjury.findMany({
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

  async publicCountCasePreInjuries(input?: UserListCasePreInjuryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreInjury.count(
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

  async publicCasePreInjury(casePreInjuryId) {

    return this.data.casePreInjury.findUnique({ where: { id: casePreInjuryId } , include: {legalCase: true}  })
  }
}


