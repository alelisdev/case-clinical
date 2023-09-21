
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateWriteOffStatusInput } from './dto/user-create-write-off-status.input'
import { UserListWriteOffStatusInput } from './dto/user-list-write-off-status.input'
import { UserUpdateWriteOffStatusInput } from './dto/user-update-write-off-status.input'
import { UserUpdateWriteOffStatusesInput } from './dto/user-update-write-off-statuses.input'



@Injectable()
export class ApiWriteOffStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userWriteOffStatuses(userId: string, input?: UserListWriteOffStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOffStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectWriteOffStatuses(userId: string, input?: UserListWriteOffStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOffStatus.findMany({
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

  async userCountWriteOffStatuses(userId: string, input?: UserListWriteOffStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.writeOffStatus.count(
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

  async userWriteOffStatus(userId: string, writeOffStatusId) {

    return this.data.writeOffStatus.findUnique({ where: { id: writeOffStatusId } , include: {writeOffs: {include: {account: true, writeOffStatus: true}}}  })
  }

  async checkWriteOffStatusExist(writeOffStatusName: string) {
    try {
      return this.data.writeOffStatus.findMany({ where: { name: writeOffStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateWriteOffStatus(userId: string, input: UserCreateWriteOffStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const writeOffStatusData = await this.checkWriteOffStatusExist(input.name)

        if (writeOffStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'WriteOffStatus', 'Create', input)

    let writeOffStatus = await this.data.writeOffStatus.create({
      data: { 
name: input.name, 

}
, include: {writeOffs: true} 
    })

    await this.data.logEvent(sendingUser, false, 'WriteOffStatus', 'Create', writeOffStatus)

    return writeOffStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Write off Status')
    }

  }


  
  

  async userUpdateWriteOffStatus(userId: string, writeOffStatusId: string, input: UserUpdateWriteOffStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!writeOffStatusId) {
        throw new BadRequestException('Write off Status Id is required')
      } else {

      const writeOffStatusData = await this.checkWriteOffStatusExist(input.name)

      if (writeOffStatusData.length > 0) {
        if (writeOffStatusData[0].id != writeOffStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'WriteOffStatus', 'Update', input)

    let writeOffStatus = this.data.writeOffStatus.update({
      where: { id: writeOffStatusId },
      data: {
name: input.name, 

}
, include: {writeOffs: true} 
    })

    await this.data.logEvent(sendingUser, false, 'WriteOffStatus', 'Update', writeOffStatus)

    return writeOffStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Write off Status')
    }
  }

  async userUpdateWriteOffStatuses(userId: string, input: UserUpdateWriteOffStatusesInput): Promise<UpdateResult> {
    const total = input.writeOffStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.writeOffStatuses) {
      const inputData = input.writeOffStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const writeOffStatusData = await this.checkWriteOffStatusExist(inputData.name)

      if (writeOffStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.writeOffStatus.upsert({
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


  async userDeleteWriteOffStatus(userId: string, writeOffStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!writeOffStatusId) {
        throw new BadRequestException('Write off Status Id is required')
      } else {

        const writeOffCount = await this.data.writeOff.count({ where: { writeOffStatusId: writeOffStatusId }})
        if(writeOffCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Write off')
        }

        await this.data.logEvent(sendingUser, true, 'WriteOffStatus', 'Delete', writeOffStatusId)

        let writeOffStatus = this.data.writeOffStatus.delete({
          where: { id: writeOffStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'WriteOffStatus', 'Delete', writeOffStatus)

        return writeOffStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Write off Status')
    }
  }
}

