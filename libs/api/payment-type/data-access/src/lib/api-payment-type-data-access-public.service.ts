
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPaymentTypeInput } from './dto/user-list-payment-type.input'

@Injectable()
export class ApiPaymentTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPaymentTypes(input?: UserListPaymentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPaymentTypes(input?: UserListPaymentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentType.findMany({
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

  async publicCountPaymentTypes(input?: UserListPaymentTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentType.count(
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

  async publicPaymentType(paymentTypeId) {

    return this.data.paymentType.findUnique({ where: { id: paymentTypeId } , include: {payments: true}  })
  }
}


