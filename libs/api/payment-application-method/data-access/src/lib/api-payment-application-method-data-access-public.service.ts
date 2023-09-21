
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPaymentApplicationMethodInput } from './dto/user-list-payment-application-method.input'

@Injectable()
export class ApiPaymentApplicationMethodDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPaymentApplicationMethods(input?: UserListPaymentApplicationMethodInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentApplicationMethod.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectPaymentApplicationMethods(input?: UserListPaymentApplicationMethodInput) {
    let name = input?.name ? input.name : undefined

    return this.data.paymentApplicationMethod.findMany({
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

  async publicCountPaymentApplicationMethods(input?: UserListPaymentApplicationMethodInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentApplicationMethod.count(
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

  async publicPaymentApplicationMethod(paymentApplicationMethodId) {

    return this.data.paymentApplicationMethod.findUnique({ where: { id: paymentApplicationMethodId } , include: {payments: true}  })
  }
}


