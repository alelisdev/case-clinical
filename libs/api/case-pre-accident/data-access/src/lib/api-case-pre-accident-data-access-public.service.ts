
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCasePreAccidentInput } from './dto/user-list-case-pre-accident.input'

@Injectable()
export class ApiCasePreAccidentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCasePreAccidents(input?: UserListCasePreAccidentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreAccident.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async publicSelectCasePreAccidents(input?: UserListCasePreAccidentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreAccident.findMany({
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

  async publicCountCasePreAccidents(input?: UserListCasePreAccidentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreAccident.count(
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

  async publicCasePreAccident(casePreAccidentId) {

    return this.data.casePreAccident.findUnique({ where: { id: casePreAccidentId } , include: {legalCase: true}  })
  }
}


