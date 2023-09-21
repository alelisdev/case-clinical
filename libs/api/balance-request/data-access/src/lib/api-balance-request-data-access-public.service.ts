
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListBalanceRequestInput } from './dto/user-list-balance-request.input'

@Injectable()
export class ApiBalanceRequestDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBalanceRequests(input?: UserListBalanceRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.balanceRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            statementId: input.statementId,
legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {statement: true, legalCase: true}
    })
  }

  async publicSelectBalanceRequests(input?: UserListBalanceRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.balanceRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            statementId: input.statementId,
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

  async publicCountBalanceRequests(input?: UserListBalanceRequestInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.balanceRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            statementId: input.statementId,
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

  async publicBalanceRequest(balanceRequestId) {

    return this.data.balanceRequest.findUnique({ where: { id: balanceRequestId } , include: {statement: true, legalCase: true}  })
  }
}


