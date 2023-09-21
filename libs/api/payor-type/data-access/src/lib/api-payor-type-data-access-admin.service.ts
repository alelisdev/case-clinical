
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePayorTypeInput } from './dto/admin-create-payor-type.input'
import { AdminListPayorTypeInput } from './dto/admin-list-payor-type.input'

import { AdminUpdatePayorTypeInput } from './dto/admin-update-payor-type.input'

@Injectable()
export class ApiPayorTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPayorTypes(adminId: string, input?: AdminListPayorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.payorType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPayorTypes(adminId: string, input?: AdminListPayorTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.payorType.count(
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

  
  

  async adminPayorType(adminId: string, payorTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.payorType.findUnique({ where: { id: payorTypeId } , include: {payments: true} })
  }

  async checkPayorTypeExist(payorTypeName: string) {
    try {
      return this.data.payorType.findMany({ where: { name: payorTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePayorType(adminId: string, input: AdminCreatePayorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const payorTypeData = await this.checkPayorTypeExist(input.name)

      if (payorTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.payorType.create({
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

  async adminUpdatePayorType(adminId: string, payorTypeId, input: AdminUpdatePayorTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.payorType.update({
      where: { id: payorTypeId },
      data: {
name: input.name, 

}
, include: {payments: true} 
    })
  }

  async adminDeletePayorType(adminId: string, payorTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.payorType.delete({ where: { id: payorTypeId } })
  }
}

