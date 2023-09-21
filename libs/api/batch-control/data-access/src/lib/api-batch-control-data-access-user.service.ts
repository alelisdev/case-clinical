
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateBatchControlInput } from './dto/user-create-batch-control.input'
import { UserListBatchControlInput } from './dto/user-list-batch-control.input'
import { UserUpdateBatchControlInput } from './dto/user-update-batch-control.input'
import { UserUpdateBatchControlsInput } from './dto/user-update-batch-controls.input'



@Injectable()
export class ApiBatchControlDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userBatchControls(userId: string, input?: UserListBatchControlInput) {
    let name = input?.name ? input.name : undefined

    return this.data.batchControl.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectBatchControls(userId: string, input?: UserListBatchControlInput) {
    let name = input?.name ? input.name : undefined

    return this.data.batchControl.findMany({
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

  async userCountBatchControls(userId: string, input?: UserListBatchControlInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.batchControl.count(
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

  async userBatchControl(userId: string, batchControlId) {

    return this.data.batchControl.findUnique({ where: { id: batchControlId } , include: { payments: { include: { batchControl: true,bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true } }}  })
  }

  async checkBatchControlExist(batchControlName: string) {
    try {
      return this.data.batchControl.findMany({ where: { name: batchControlName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateBatchControl(userId: string, input: UserCreateBatchControlInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const batchControlData = await this.checkBatchControlExist(input.name)

        if (batchControlData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'BatchControl', 'Create', input)

    let batchControl = await this.data.batchControl.create({
      data: {
name: input.name,
trackingNumber: input.trackingNumber,
batchTotal: input.batchTotal,
defaultGLCode: input.defaultGLCode,
posted: input.posted,

}
, include: {payments: { include: { batchControl: true,bank: true, payorType: true, paymentType: true, paymentApplicationMethod: true } }}
    })

    await this.data.logEvent(sendingUser, false, 'BatchControl', 'Create', batchControl)

    return batchControl

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Batch Control')
    }

  }





  async userUpdateBatchControl(userId: string, batchControlId: string, input: UserUpdateBatchControlInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!batchControlId) {
        throw new BadRequestException('Batch Control Id is required')
      } else {

      const batchControlData = await this.checkBatchControlExist(input.name)

      if (batchControlData.length > 0) {
        if (batchControlData[0].id != batchControlId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'BatchControl', 'Update', input)

    let batchControl = this.data.batchControl.update({
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

    await this.data.logEvent(sendingUser, false, 'BatchControl', 'Update', batchControl)

    return batchControl

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Batch Control')
    }
  }

  async userUpdateBatchControls(userId: string, input: UserUpdateBatchControlsInput): Promise<UpdateResult> {
    const total = input.batchControls.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.batchControls) {
      const inputData = input.batchControls[key]

      const data = {
        id: inputData.id,
name: inputData.name,
trackingNumber: inputData.trackingNumber,
batchTotal: inputData.batchTotal,
defaultGLCode: inputData.defaultGLCode,
posted: inputData.posted,

      }

      const batchControlData = await this.checkBatchControlExist(inputData.name)

      if (batchControlData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.batchControl.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteBatchControl(userId: string, batchControlId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!batchControlId) {
        throw new BadRequestException('Batch Control Id is required')
      } else {

        const paymentCount = await this.data.payment.count({ where: { batchControlId: batchControlId }})
        if(paymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Payment')
        }

        await this.data.logEvent(sendingUser, true, 'BatchControl', 'Delete', batchControlId)

        let batchControl = this.data.batchControl.delete({
          where: { id: batchControlId }
        })

        await this.data.logEvent(sendingUser, false, 'BatchControl', 'Delete', batchControl)

        return batchControl

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Batch Control')
    }
  }
}

