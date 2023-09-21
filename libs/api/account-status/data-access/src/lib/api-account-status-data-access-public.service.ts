
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAccountStatusInput } from './dto/user-list-account-status.input'

@Injectable()
export class ApiAccountStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAccountStatuses(input?: UserListAccountStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accountStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAccountStatuses(input?: UserListAccountStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.accountStatus.findMany({
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

  async publicCountAccountStatuses(input?: UserListAccountStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.accountStatus.count(
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

  async publicAccountStatus(accountStatusId) {

    return this.data.accountStatus.findUnique({ where: { id: accountStatusId } , include: {caseAccounts: true}  })
  }
}


