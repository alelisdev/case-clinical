
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseAccountPaymentInput } from './dto/admin-create-case-account-payment.input'
import { AdminListCaseAccountPaymentInput } from './dto/admin-list-case-account-payment.input'
import { AdminListPaymentInput } from '@case-clinical/api/payment/data-access'
import { AdminListCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { AdminUpdateCaseAccountPaymentInput } from './dto/admin-update-case-account-payment.input'

@Injectable()
export class ApiCaseAccountPaymentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseAccountPayments(adminId: string, input?: AdminListCaseAccountPaymentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.caseAccountPayment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {payment: true, caseAccount: true}
    })
  }

  async adminCountCaseAccountPayments(adminId: string, input?: AdminListCaseAccountPaymentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccountPayment.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminCaseAccountPayment(adminId: string, caseAccountPaymentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseAccountPayment.findUnique({ where: { id: caseAccountPaymentId } , include: {payment: true, caseAccount: true} })
  }

  async checkCaseAccountPaymentExist(caseAccountPaymentName: string) {
    try {
      return this.data.caseAccountPayment.findMany({ where: { name: caseAccountPaymentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseAccountPayment(adminId: string, input: AdminCreateCaseAccountPaymentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseAccountPaymentData = await this.checkCaseAccountPaymentExist(input.name)

      if (caseAccountPaymentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseAccountPayment.create({
          data: { 
      
                payment: 
                input.paymentId != null
                ? {
                        connect:  { 
                            id: input.paymentId
                        }
                    }: undefined,  
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
amountApplied: input.amountApplied, 

    }
    , include: {payment: true, caseAccount: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCaseAccountPayment(adminId: string, caseAccountPaymentId, input: AdminUpdateCaseAccountPaymentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseAccountPayment.update({
      where: { id: caseAccountPaymentId },
      data: {
  
                payment: 
                input.paymentId != null
                ? {
                        connect:  { 
                            id: input.paymentId
                        }
                    }: undefined,  
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
amountApplied: input.amountApplied, 

}
, include: {payment: true, caseAccount: true} 
    })
  }

  async adminDeleteCaseAccountPayment(adminId: string, caseAccountPaymentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseAccountPayment.delete({ where: { id: caseAccountPaymentId } })
  }
}

