
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListReconciliationPeriodTypeInput } from './dto/user-list-reconciliation-period-type.input'

@Injectable()
export class ApiReconciliationPeriodTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicReconciliationPeriodTypes(input?: UserListReconciliationPeriodTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.reconciliationPeriodType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectReconciliationPeriodTypes(input?: UserListReconciliationPeriodTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.reconciliationPeriodType.findMany({
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

  async publicCountReconciliationPeriodTypes(input?: UserListReconciliationPeriodTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.reconciliationPeriodType.count(
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

  async publicReconciliationPeriodType(reconciliationPeriodTypeId) {

    return this.data.reconciliationPeriodType.findUnique({ where: { id: reconciliationPeriodTypeId } , include: {contracts: true}  })
  }
}


