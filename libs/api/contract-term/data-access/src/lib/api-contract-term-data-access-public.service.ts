
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContractTermInput } from './dto/user-list-contract-term.input'

@Injectable()
export class ApiContractTermDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContractTerms(input?: UserListContractTermInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractTerm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input.contractTermId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true}
    })
  }

  async publicSelectContractTerms(input?: UserListContractTermInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractTerm.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input.contractTermId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContractTerms(input?: UserListContractTermInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contractTerm.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractTermId: input.contractTermId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContractTerm(contractTermId) {

    return this.data.contractTerm.findUnique({ where: { id: contractTermId } , include: {contract: true}  })
  }
}


