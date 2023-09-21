
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPaymentInput } from './dto/user-list-payment.input'

@Injectable()
export class ApiPaymentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPayments(input?: UserListPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input.batchControlId,
bankId: input.bankId,
payorTypeId: input.payorTypeId,
paymentTypeId: input.paymentTypeId,
paymentApplicationMethodId: input.paymentApplicationMethodId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true}
    })
  }

  async publicSelectPayments(input?: UserListPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.payment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input.batchControlId,
bankId: input.bankId,
payorTypeId: input.payorTypeId,
paymentTypeId: input.paymentTypeId,
paymentApplicationMethodId: input.paymentApplicationMethodId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPayments(input?: UserListPaymentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.payment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            batchControlId: input.batchControlId,
bankId: input.bankId,
payorTypeId: input.payorTypeId,
paymentTypeId: input.paymentTypeId,
paymentApplicationMethodId: input.paymentApplicationMethodId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPayment(paymentId) {

    return this.data.payment.findUnique({ where: { id: paymentId } , include: {batchControl: true, bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true, caseAccountPayments: true}  })
  }
}


