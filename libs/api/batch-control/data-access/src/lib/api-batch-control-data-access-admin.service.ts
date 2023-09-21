
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateBatchControlInput } from './dto/admin-create-batch-control.input'
import { AdminListBatchControlInput } from './dto/admin-list-batch-control.input'

import { AdminUpdateBatchControlInput } from './dto/admin-update-batch-control.input'

@Injectable()
export class ApiBatchControlDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminBatchControls(adminId: string, input?: AdminListBatchControlInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.batchControl.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountBatchControls(adminId: string, input?: AdminListBatchControlInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.batchControl.count(
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

  
  

  async adminBatchControl(adminId: string, batchControlId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.batchControl.findUnique({ where: { id: batchControlId } , include: {payments: true} })
  }

  async checkBatchControlExist(batchControlName: string) {
    try {
      return this.data.batchControl.findMany({ where: { name: batchControlName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateBatchControl(adminId: string, input: AdminCreateBatchControlInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const batchControlData = await this.checkBatchControlExist(input.name)

      if (batchControlData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.batchControl.create({
          data: { 
    name: input.name, 
trackingNumber: input.trackingNumber, 
batchTotal: input.batchTotal, 
defaultGLCode: input.defaultGLCode, 
posted: input.posted, 

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

  async adminUpdateBatchControl(adminId: string, batchControlId, input: AdminUpdateBatchControlInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.batchControl.update({
      where: { id: batchControlId },
      data: {
name: input.name, 
trackingNumber: input.trackingNumber, 
batchTotal: input.batchTotal, 
defaultGLCode: input.defaultGLCode, 
posted: input.posted, 

}
, include: {payments: true} 
    })
  }

  async adminDeleteBatchControl(adminId: string, batchControlId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.batchControl.delete({ where: { id: batchControlId } })
  }
}

