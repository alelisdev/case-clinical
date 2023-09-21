
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateReconciliationPeriodTypeInput } from './dto/user-create-reconciliation-period-type.input'
import { UserListReconciliationPeriodTypeInput } from './dto/user-list-reconciliation-period-type.input'
import { UserUpdateReconciliationPeriodTypeInput } from './dto/user-update-reconciliation-period-type.input'
import { UserUpdateReconciliationPeriodTypesInput } from './dto/user-update-reconciliation-period-types.input'



@Injectable()
export class ApiReconciliationPeriodTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userReconciliationPeriodTypes(userId: string, input?: UserListReconciliationPeriodTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.reconciliationPeriodType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectReconciliationPeriodTypes(userId: string, input?: UserListReconciliationPeriodTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.reconciliationPeriodType.findMany({
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

  async userCountReconciliationPeriodTypes(userId: string, input?: UserListReconciliationPeriodTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.reconciliationPeriodType.count(
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

  async userReconciliationPeriodType(userId: string, reconciliationPeriodTypeId) {

    return this.data.reconciliationPeriodType.findUnique({ where: { id: reconciliationPeriodTypeId } , include: {contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}}  })
  }

  async checkReconciliationPeriodTypeExist(reconciliationPeriodTypeName: string) {
    try {
      return this.data.reconciliationPeriodType.findMany({ where: { name: reconciliationPeriodTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateReconciliationPeriodType(userId: string, input: UserCreateReconciliationPeriodTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const reconciliationPeriodTypeData = await this.checkReconciliationPeriodTypeExist(input.name)

        if (reconciliationPeriodTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ReconciliationPeriodType', 'Create', input)

    let reconciliationPeriodType = await this.data.reconciliationPeriodType.create({
      data: { 
name: input.name, 

}
, include: {contracts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ReconciliationPeriodType', 'Create', reconciliationPeriodType)

    return reconciliationPeriodType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Reconciliation Period Type')
    }

  }


  
  

  async userUpdateReconciliationPeriodType(userId: string, reconciliationPeriodTypeId: string, input: UserUpdateReconciliationPeriodTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!reconciliationPeriodTypeId) {
        throw new BadRequestException('Reconciliation Period Type Id is required')
      } else {

      const reconciliationPeriodTypeData = await this.checkReconciliationPeriodTypeExist(input.name)

      if (reconciliationPeriodTypeData.length > 0) {
        if (reconciliationPeriodTypeData[0].id != reconciliationPeriodTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ReconciliationPeriodType', 'Update', input)

    let reconciliationPeriodType = this.data.reconciliationPeriodType.update({
      where: { id: reconciliationPeriodTypeId },
      data: {
name: input.name, 

}
, include: {contracts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ReconciliationPeriodType', 'Update', reconciliationPeriodType)

    return reconciliationPeriodType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Reconciliation Period Type')
    }
  }

  async userUpdateReconciliationPeriodTypes(userId: string, input: UserUpdateReconciliationPeriodTypesInput): Promise<UpdateResult> {
    const total = input.reconciliationPeriodTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.reconciliationPeriodTypes) {
      const inputData = input.reconciliationPeriodTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const reconciliationPeriodTypeData = await this.checkReconciliationPeriodTypeExist(inputData.name)

      if (reconciliationPeriodTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.reconciliationPeriodType.upsert({
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


  async userDeleteReconciliationPeriodType(userId: string, reconciliationPeriodTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!reconciliationPeriodTypeId) {
        throw new BadRequestException('Reconciliation Period Type Id is required')
      } else {

        const contractCount = await this.data.contract.count({ where: { reconciliationPeriodTypeId: reconciliationPeriodTypeId }})
        if(contractCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contract')
        }

        await this.data.logEvent(sendingUser, true, 'ReconciliationPeriodType', 'Delete', reconciliationPeriodTypeId)

        let reconciliationPeriodType = this.data.reconciliationPeriodType.delete({
          where: { id: reconciliationPeriodTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'ReconciliationPeriodType', 'Delete', reconciliationPeriodType)

        return reconciliationPeriodType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Reconciliation Period Type')
    }
  }
}

