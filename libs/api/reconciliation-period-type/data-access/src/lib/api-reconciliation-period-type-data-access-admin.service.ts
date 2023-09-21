
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateReconciliationPeriodTypeInput } from './dto/admin-create-reconciliation-period-type.input'
import { AdminListReconciliationPeriodTypeInput } from './dto/admin-list-reconciliation-period-type.input'

import { AdminUpdateReconciliationPeriodTypeInput } from './dto/admin-update-reconciliation-period-type.input'

@Injectable()
export class ApiReconciliationPeriodTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminReconciliationPeriodTypes(adminId: string, input?: AdminListReconciliationPeriodTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.reconciliationPeriodType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountReconciliationPeriodTypes(adminId: string, input?: AdminListReconciliationPeriodTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.reconciliationPeriodType.count(
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

  
  

  async adminReconciliationPeriodType(adminId: string, reconciliationPeriodTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.reconciliationPeriodType.findUnique({ where: { id: reconciliationPeriodTypeId } , include: {contracts: true} })
  }

  async checkReconciliationPeriodTypeExist(reconciliationPeriodTypeName: string) {
    try {
      return this.data.reconciliationPeriodType.findMany({ where: { name: reconciliationPeriodTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateReconciliationPeriodType(adminId: string, input: AdminCreateReconciliationPeriodTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const reconciliationPeriodTypeData = await this.checkReconciliationPeriodTypeExist(input.name)

      if (reconciliationPeriodTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.reconciliationPeriodType.create({
          data: { 
    name: input.name, 

    }
    , include: {contracts: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateReconciliationPeriodType(adminId: string, reconciliationPeriodTypeId, input: AdminUpdateReconciliationPeriodTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.reconciliationPeriodType.update({
      where: { id: reconciliationPeriodTypeId },
      data: {
name: input.name, 

}
, include: {contracts: true} 
    })
  }

  async adminDeleteReconciliationPeriodType(adminId: string, reconciliationPeriodTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.reconciliationPeriodType.delete({ where: { id: reconciliationPeriodTypeId } })
  }
}

