
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListBankInput } from './dto/user-list-bank.input'

@Injectable()
export class ApiBankDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicBanks(input?: UserListBankInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bank.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectBanks(input?: UserListBankInput) {
    let name = input?.name ? input.name : undefined

    return this.data.bank.findMany({
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

  async publicCountBanks(input?: UserListBankInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.bank.count(
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

  async publicBank(bankId) {

    return this.data.bank.findUnique({ where: { id: bankId } , include: {payments: true}  })
  }
}


