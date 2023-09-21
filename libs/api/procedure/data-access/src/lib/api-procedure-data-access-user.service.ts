
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureInput } from './dto/user-create-procedure.input'
import { UserListProcedureInput } from './dto/user-list-procedure.input'
import { UserUpdateProcedureInput } from './dto/user-update-procedure.input'
import { UserUpdateProceduresInput } from './dto/user-update-procedures.input'



@Injectable()
export class ApiProcedureDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedures(userId: string, input?: UserListProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectProcedures(userId: string, input?: UserListProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedure.findMany({
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

  async userCountProcedures(userId: string, input?: UserListProcedureInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedure.count(
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

  async userProcedure(userId: string, procedureId) {

    return this.data.procedure.findUnique({ where: { id: procedureId } , include: {priorAuthorizationProcedureCodes: {include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}}, claimProcedures:true}  })
  }

  async checkProcedureExist(procedureName: string) {
    try {
      return this.data.procedure.findMany({ where: { name: procedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedure(userId: string, input: UserCreateProcedureInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const procedureData = await this.checkProcedureExist(input.name)

        if (procedureData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Procedure', 'Create', input)

    let procedure = await this.data.procedure.create({
      data: { 
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationProcedureCodes: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Procedure', 'Create', procedure)

    return procedure

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure')
    }

  }


  
  

  async userUpdateProcedure(userId: string, procedureId: string, input: UserUpdateProcedureInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureId) {
        throw new BadRequestException('Procedure Id is required')
      } else {

      const procedureData = await this.checkProcedureExist(input.name)

      if (procedureData.length > 0) {
        if (procedureData[0].id != procedureId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Procedure', 'Update', input)

    let procedure = this.data.procedure.update({
      where: { id: procedureId },
      data: {
name: input.name, 
code: input.code, 

}
, include: {priorAuthorizationProcedureCodes: true, claimProcedures:true} 
    })

    await this.data.logEvent(sendingUser, false, 'Procedure', 'Update', procedure)

    return procedure

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure')
    }
  }

  async userUpdateProcedures(userId: string, input: UserUpdateProceduresInput): Promise<UpdateResult> {
    const total = input.procedures.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.procedures) {
      const inputData = input.procedures[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
code: inputData.code, 

      }

      const procedureData = await this.checkProcedureExist(inputData.name)

      if (procedureData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedure.upsert({
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


  async userDeleteProcedure(userId: string, procedureId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!procedureId) {
        throw new BadRequestException('Procedure Id is required')
      } else {

        const priorAuthorizationProcedureCodeCount = await this.data.priorAuthorizationProcedureCode.count({ where: { procedureId: procedureId }})
        if(priorAuthorizationProcedureCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Procedure Code')
        }

        const claimProcedureCodeCount = await this.data.claimProcedure.count({ where: { procedureCodeId: procedureId }})
        if(claimProcedureCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim Procedure')
        }

        await this.data.logEvent(sendingUser, true, 'Procedure', 'Delete', procedureId)

        let procedure = this.data.procedure.delete({
          where: { id: procedureId }
        })

        await this.data.logEvent(sendingUser, false, 'Procedure', 'Delete', procedure)

        return procedure

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Procedure')
    }
  }
}

