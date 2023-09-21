
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePaymentTypeInput } from './dto/admin-create-payment-type.input'
import { AdminListPaymentTypeInput } from './dto/admin-list-payment-type.input'

import { AdminUpdatePaymentTypeInput } from './dto/admin-update-payment-type.input'

@Injectable()
export class ApiPaymentTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPaymentTypes(adminId: string, input?: AdminListPaymentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.paymentType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPaymentTypes(adminId: string, input?: AdminListPaymentTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.paymentType.count(
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

  
  

  async adminPaymentType(adminId: string, paymentTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.paymentType.findUnique({ where: { id: paymentTypeId } , include: {payments: true} })
  }

  async checkPaymentTypeExist(paymentTypeName: string) {
    try {
      return this.data.paymentType.findMany({ where: { name: paymentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePaymentType(adminId: string, input: AdminCreatePaymentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const paymentTypeData = await this.checkPaymentTypeExist(input.name)

      if (paymentTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.paymentType.create({
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

  async adminUpdatePaymentType(adminId: string, paymentTypeId, input: AdminUpdatePaymentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.paymentType.update({
      where: { id: paymentTypeId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })
  }

  async adminDeletePaymentType(adminId: string, paymentTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.paymentType.delete({ where: { id: paymentTypeId } })
  }
}

