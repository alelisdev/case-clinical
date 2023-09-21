
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcedureStatusInput } from './dto/user-create-procedure-status.input'
import { UserListProcedureStatusInput } from './dto/user-list-procedure-status.input'
import { UserUpdateProcedureStatusInput } from './dto/user-update-procedure-status.input'
import { UserUpdateProcedureStatusesInput } from './dto/user-update-procedure-statuses.input'



@Injectable()
export class ApiProcedureStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcedureStatuses(userId: string, input?: UserListProcedureStatusInput) {
    const name = input?.name ? input.name : undefined

    return this.data.procedureStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userSelectProcedureStatuses(userId: string, input?: UserListProcedureStatusInput) {
    const name = input?.name ? input.name : undefined

    return this.data.procedureStatus.findMany({
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

  async userCountProcedureStatuses(userId: string, input?: UserListProcedureStatusInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined

    const total = await this.data.procedureStatus.count(
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

  async userProcedureStatus(userId: string, procedureStatusId) {

    return this.data.procedureStatus.findUnique({ where: { id: procedureStatusId } , include: {caseProcedures: {include: { location: true, legalCase: true, appointment: true }}}})
  }

  async checkProcedureStatusExist(procedureStatusName: string) {
    try {
      return this.data.procedureStatus.findMany({ where: { name: procedureStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcedureStatus(userId: string, input: UserCreateProcedureStatusInput) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    try {
        const procedureStatusData = await this.checkProcedureStatusExist(input.name)

        if (procedureStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ProcedureStatus', 'Create', input)

    const procedureStatus = await this.data.procedureStatus.create({
      data: {
name: input.name,

}
, include: {caseProcedures: true}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureStatus', 'Create', procedureStatus)

    return procedureStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Procedure Status')
    }

  }





  async userUpdateProcedureStatus(userId: string, procedureStatusId: string, input: UserUpdateProcedureStatusInput) {

    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureStatusId) {
        throw new BadRequestException('Procedure Status Id is required')
      } else {

      const procedureStatusData = await this.checkProcedureStatusExist(input.name)

      if (procedureStatusData.length > 0) {
        if (procedureStatusData[0].id != procedureStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ProcedureStatus', 'Update', input)

    const procedureStatus = this.data.procedureStatus.update({
      where: { id: procedureStatusId },
      data: {
name: input.name,

}
, include: {caseProcedures: {include: { location: true, legalCase: true, appointment: true }}}
    })

    await this.data.logEvent(sendingUser, false, 'ProcedureStatus', 'Update', procedureStatus)

    return procedureStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Procedure Status')
    }
  }

  async userUpdateProcedureStatuses(userId: string, input: UserUpdateProcedureStatusesInput): Promise<UpdateResult> {
    const total = input.procedureStatuses.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.procedureStatuses) {
      const inputData = input.procedureStatuses[key]

      const data = {
        id: inputData.id,
name: inputData.name,

      }

      const procedureStatusData = await this.checkProcedureStatusExist(inputData.name)

      if (procedureStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.procedureStatus.upsert({
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


  async userDeleteProcedureStatus(userId: string, procedureStatusId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!procedureStatusId) {
        throw new BadRequestException('Procedure Status Id is required')
      } else {

        const procedureCount = await this.data.caseProcedure.count({ where: { procedureStatusId: procedureStatusId }})
        if(procedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Procedure')
        }

        await this.data.logEvent(sendingUser, true, 'ProcedureStatus', 'Delete', procedureStatusId)

        const procedureStatus = this.data.procedureStatus.delete({
          where: { id: procedureStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'ProcedureStatus', 'Delete', procedureStatus)

        return procedureStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Procedure Status')
    }
  }
}

