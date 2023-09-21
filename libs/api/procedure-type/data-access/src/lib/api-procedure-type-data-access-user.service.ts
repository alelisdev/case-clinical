
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureTypeInput } from './dto/user-create-procedure-type.input'
import { UserListProcedureTypeInput } from './dto/user-list-procedure-type.input'
import { UserUpdateProcedureTypeInput } from './dto/user-update-procedure-type.input'
import { UserUpdateProcedureTypesInput } from './dto/user-update-procedure-types.input'



@Injectable()
export class ApiProcedureTypeDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureTypes(userId: string, input?: UserListProcedureTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectProcedureTypes(userId: string, input?: UserListProcedureTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureType.findMany({
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

  async userCountProcedureTypes(userId: string, input?: UserListProcedureTypeInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureType.count(
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

  async userProcedureType(userId: string, procedureTypeId) {

    return this.data.procedureType.findUnique({ where: { id: procedureTypeId } , include: {caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}}  })
  }

  async checkProcedureTypeExist(procedureTypeName: string) {
    try {
      return this.data.procedureType.findMany({ where: { name: procedureTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureType(userId: string, input: UserCreateProcedureTypeInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureTypeData = await this.checkProcedureTypeExist(input.name)

        if (procedureTypeData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureType', 'Create', input)

    let procedureType = await this.data.procedureType.create({
      data: { 
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
isSystem: input.isSystem, 
removed: input.removed, 
modality: input.modality, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureType', 'Create', procedureType)

    return procedureType

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure Type')
    }

  }


  
  

  async userUpdateProcedureType(userId: string, procedureTypeId: string, input: UserUpdateProcedureTypeInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureTypeId) {
        throw new BadRequestException('Procedure Type Id is required')
      } else {

      const procedureTypeData = await this.checkProcedureTypeExist(input.name)

      if (procedureTypeData.length > 0) {
        if (procedureTypeData[0].id != procedureTypeId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureType', 'Update', input)

    let procedureType = this.data.procedureType.update({
      where: { id: procedureTypeId },
      data: {
name: input.name, 
orderIndex: input.orderIndex, 
dateCreated: input.dateCreated, 
isSystem: input.isSystem, 
removed: input.removed, 
modality: input.modality, 

}
, include: {caseAccounts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureType', 'Update', procedureType)

    return procedureType

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure Type')
    }
  }

  async userUpdateProcedureTypes(userId: string, input: UserUpdateProcedureTypesInput): Promise<UpdateResult> {
    const total = input.procedureTypes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureTypes) {
      const inputData = input.procedureTypes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
orderIndex: inputData.orderIndex, 
dateCreated: inputData.dateCreated, 
isSystem: inputData.isSystem, 
removed: inputData.removed, 
modality: inputData.modality, 

      }

      const procedureTypeData = await this.checkProcedureTypeExist(inputData.name)

      if (procedureTypeData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureType.upsert({
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


  async userDeleteProcedureType(userId: string, procedureTypeId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureTypeId) {
        throw new BadRequestException('Procedure Type Id is required')
      } else {

        const caseAccountCount = await this.data.caseAccount.count({ where: { procedureTypeId: procedureTypeId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }

        await this.data.logEvent(sendingUser, true, 'ProcedureType', 'Delete', procedureTypeId)

        let procedureType = this.data.procedureType.delete({
          where: { id: procedureTypeId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureType', 'Delete', procedureType)

        return procedureType

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Procedure Type')
    }
  }
}

