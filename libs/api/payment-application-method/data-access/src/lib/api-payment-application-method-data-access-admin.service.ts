
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePaymentApplicationMethodInput } from './dto/admin-create-payment-application-method.input'
import { AdminListPaymentApplicationMethodInput } from './dto/admin-list-payment-application-method.input'

import { AdminUpdatePaymentApplicationMethodInput } from './dto/admin-update-payment-application-method.input'

@Injectable()
export class ApiPaymentApplicationMethodDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPaymentApplicationMethods(adminId: string, input?: AdminListPaymentApplicationMethodInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.paymentApplicationMethod.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPaymentApplicationMethods(adminId: string, input?: AdminListPaymentApplicationMethodInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentApplicationMethod.count(
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

  
  

  async adminPaymentApplicationMethod(adminId: string, paymentApplicationMethodId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.paymentApplicationMethod.findUnique({ where: { id: paymentApplicationMethodId } , include: {payments: true} })
  }

  async checkPaymentApplicationMethodExist(paymentApplicationMethodName: string) {
    try {
      return this.data.paymentApplicationMethod.findMany({ where: { name: paymentApplicationMethodName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePaymentApplicationMethod(adminId: string, input: AdminCreatePaymentApplicationMethodInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const paymentApplicationMethodData = await this.checkPaymentApplicationMethodExist(input.name)

      if (paymentApplicationMethodData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.paymentApplicationMethod.create({
          data: { 
    name: input.name, 

    }
    , include: {payments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePaymentApplicationMethod(adminId: string, paymentApplicationMethodId, input: AdminUpdatePaymentApplicationMethodInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.paymentApplicationMethod.update({
      where: { id: paymentApplicationMethodId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })
  }

  async adminDeletePaymentApplicationMethod(adminId: string, paymentApplicationMethodId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.paymentApplicationMethod.delete({ where: { id: paymentApplicationMethodId } })
  }
}

