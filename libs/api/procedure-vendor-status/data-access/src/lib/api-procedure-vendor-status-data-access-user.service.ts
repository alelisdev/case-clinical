
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureVendorStatusInput } from './dto/user-create-procedure-vendor-status.input'
import { UserListProcedureVendorStatusInput } from './dto/user-list-procedure-vendor-status.input'
import { UserUpdateProcedureVendorStatusInput } from './dto/user-update-procedure-vendor-status.input'
import { UserUpdateProcedureVendorStatusesInput } from './dto/user-update-procedure-vendor-statuses.input'



@Injectable()
export class ApiProcedureVendorStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureVendorStatuses(userId: string, input?: UserListProcedureVendorStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendorStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectProcedureVendorStatuses(userId: string, input?: UserListProcedureVendorStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureVendorStatus.findMany({
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

  async userCountProcedureVendorStatuses(userId: string, input?: UserListProcedureVendorStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureVendorStatus.count(
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

  async userProcedureVendorStatus(userId: string, procedureVendorStatusId) {

    return this.data.procedureVendorStatus.findUnique({ where: { id: procedureVendorStatusId } , include: {procedureVendors: true}  })
  }

  async checkProcedureVendorStatusExist(procedureVendorStatusName: string) {
    try {
      return this.data.procedureVendorStatus.findMany({ where: { name: procedureVendorStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureVendorStatus(userId: string, input: UserCreateProcedureVendorStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureVendorStatusData = await this.checkProcedureVendorStatusExist(input.name)

        if (procedureVendorStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureVendorStatus', 'Create', input)

    let procedureVendorStatus = await this.data.procedureVendorStatus.create({
      data: { 
name: input.name, 

}
, include: {procedureVendors: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureVendorStatus', 'Create', procedureVendorStatus)

    return procedureVendorStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure Vendor Status')
    }

  }


  
  

  async userUpdateProcedureVendorStatus(userId: string, procedureVendorStatusId: string, input: UserUpdateProcedureVendorStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureVendorStatusId) {
        throw new BadRequestException('Procedure Vendor Status Id is required')
      } else {

      const procedureVendorStatusData = await this.checkProcedureVendorStatusExist(input.name)

      if (procedureVendorStatusData.length > 0) {
        if (procedureVendorStatusData[0].id != procedureVendorStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureVendorStatus', 'Update', input)

    let procedureVendorStatus = this.data.procedureVendorStatus.update({
      where: { id: procedureVendorStatusId },
      data: {
name: input.name, 

}
, include: {procedureVendors: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureVendorStatus', 'Update', procedureVendorStatus)

    return procedureVendorStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure Vendor Status')
    }
  }

  async userUpdateProcedureVendorStatuses(userId: string, input: UserUpdateProcedureVendorStatusesInput): Promise<UpdateResult> {
    const total = input.procedureVendorStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedureVendorStatuses) {
      const inputData = input.procedureVendorStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const procedureVendorStatusData = await this.checkProcedureVendorStatusExist(inputData.name)

      if (procedureVendorStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureVendorStatus.upsert({
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


  async userDeleteProcedureVendorStatus(userId: string, procedureVendorStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureVendorStatusId) {
        throw new BadRequestException('Procedure Vendor Status Id is required')
      } else {


        const procedureVendorCount = await this.data.procedureVendor.count({ where: { statusId: procedureVendorStatusId }})
        if(procedureVendorCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure Vendor')
        }


        await this.data.logEvent(sendingUser, true, 'ProcedureVendorStatus', 'Delete', procedureVendorStatusId)

        let procedureVendorStatus = this.data.procedureVendorStatus.delete({
          where: { id: procedureVendorStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureVendorStatus', 'Delete', procedureVendorStatus)

        return procedureVendorStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Procedure Vendor Status')
    }
  }
}

