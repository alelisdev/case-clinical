
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateProcessInput } from './dto/user-create-process.input'
import { UserListProcessInput } from './dto/user-list-process.input'
import { UserUpdateProcessInput } from './dto/user-update-process.input'
import { UserUpdateProcessesInput } from './dto/user-update-processes.input'



@Injectable()
export class ApiProcessDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userProcesses(userId: string, input?: UserListProcessInput) {
    let name = input?.name ? input.name : undefined

    return this.data.process.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectProcesses(userId: string, input?: UserListProcessInput) {
    let name = input?.name ? input.name : undefined

    return this.data.process.findMany({
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

  async userCountProcesses(userId: string, input?: UserListProcessInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.process.count(
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

  async userProcess(userId: string, processId) {

    return this.data.process.findUnique({ where: { id: processId } , include: {contracts: {include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}}}  })
  }

  async checkProcessExist(processName: string) {
    try {
      return this.data.process.findMany({ where: { name: processName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateProcess(userId: string, input: UserCreateProcessInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const processData = await this.checkProcessExist(input.name)

        if (processData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Process', 'Create', input)

    let process = await this.data.process.create({
      data: { 
name: input.name, 

}
, include: {contracts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Process', 'Create', process)

    return process

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Process')
    }

  }


  
  

  async userUpdateProcess(userId: string, processId: string, input: UserUpdateProcessInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!processId) {
        throw new BadRequestException('Process Id is required')
      } else {

      const processData = await this.checkProcessExist(input.name)

      if (processData.length > 0) {
        if (processData[0].id != processId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Process', 'Update', input)

    let process = this.data.process.update({
      where: { id: processId },
      data: {
name: input.name, 

}
, include: {contracts: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Process', 'Update', process)

    return process

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Process')
    }
  }

  async userUpdateProcesses(userId: string, input: UserUpdateProcessesInput): Promise<UpdateResult> {
    const total = input.processes.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.processes) {
      const inputData = input.processes[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const processData = await this.checkProcessExist(inputData.name)

      if (processData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.process.upsert({
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


  async userDeleteProcess(userId: string, processId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!processId) {
        throw new BadRequestException('Process Id is required')
      } else {

        const contractCount = await this.data.contract.count({ where: { processId: processId }})
        if(contractCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contract')
        }

        await this.data.logEvent(sendingUser, true, 'Process', 'Delete', processId)

        let process = this.data.process.delete({
          where: { id: processId }
        })

        await this.data.logEvent(sendingUser, false, 'Process', 'Delete', process)

        return process

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Process')
    }
  }
}

