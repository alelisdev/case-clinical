
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseAccountPaymentInput } from './dto/user-list-case-account-payment.input'

@Injectable()
export class ApiCaseAccountPaymentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseAccountPayments(input?: UserListCaseAccountPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccountPayment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input.paymentId,
caseAccountId: input.caseAccountId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {payment: true, caseAccount: true}
    })
  }

  async publicSelectCaseAccountPayments(input?: UserListCaseAccountPaymentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccountPayment.findMany({
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input.paymentId,
caseAccountId: input.caseAccountId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCaseAccountPayments(input?: UserListCaseAccountPaymentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccountPayment.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            paymentId: input.paymentId,
caseAccountId: input.caseAccountId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCaseAccountPayment(caseAccountPaymentId) {

    return this.data.caseAccountPayment.findUnique({ where: { id: caseAccountPaymentId } , include: {payment: true, caseAccount: true}  })
  }
}


