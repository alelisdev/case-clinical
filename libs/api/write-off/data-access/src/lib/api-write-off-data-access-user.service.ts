
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateWriteOffInput } from './dto/user-create-write-off.input'
import { UserListWriteOffInput } from './dto/user-list-write-off.input'
import { UserUpdateWriteOffInput } from './dto/user-update-write-off.input'
import { UserUpdateWriteOffsInput } from './dto/user-update-write-offs.input'

import { UserListCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { UserListWriteOffStatusInput } from '@case-clinical/api/write-off-status/data-access'

@Injectable()
export class ApiWriteOffDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userWriteOffs(userId: string, input?: UserListWriteOffInput) {
    let name = input?.name ? input.name : undefined

    return this.data.writeOff.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accountId: input?.accountId ? input.accountId : undefined,
            writeOffStatusId: input?.writeOffStatusId ? input.writeOffStatusId : undefined,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {account: true, writeOffStatus: true}
    })
  }

  async userSelectWriteOffs(userId: string, input?: UserListWriteOffInput) {
    let name = input?.name ? input.name : undefined
    let accountId = input?.accountId ? input.accountId : undefined
    let writeOffStatusId = input?.writeOffStatusId ? input.writeOffStatusId : undefined

    return this.data.writeOff.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accountId: accountId,
writeOffStatusId: writeOffStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountWriteOffs(userId: string, input?: UserListWriteOffInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined
    const total = await this.data.writeOff.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accountId: input?.accountId ? input.accountId : undefined,
writeOffStatusId: input?.writeOffStatusId ? input.writeOffStatusId : undefined,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userWriteOff(userId: string, writeOffId) {

    return this.data.writeOff.findUnique({ where: { id: writeOffId } , include: {account: true, writeOffStatus: true}  })
  }

  async checkWriteOffExist(writeOffName: string) {
    try {
      return this.data.writeOff.findMany({ where: { name: writeOffName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateWriteOff(userId: string, input: UserCreateWriteOffInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const writeOffData = await this.checkWriteOffExist(input.name)

        if (writeOffData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'WriteOff', 'Create', input)

    let writeOff = await this.data.writeOff.create({
      data: { 
  
                account: 
                input.accountId != null
                ? {
                        connect:  { 
                            id: input.accountId
                        }
                    }: undefined,  
                writeOffStatus: 
                input.writeOffStatusId != null
                ? {
                        connect:  { 
                            id: input.writeOffStatusId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 

}
, include: {account: true, writeOffStatus: true} 
    })

    await this.data.logEvent(sendingUser, false, 'WriteOff', 'Create', writeOff)

    return writeOff

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Write off')
    }

  }


  
  

  async userUpdateWriteOff(userId: string, writeOffId: string, input: UserUpdateWriteOffInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!writeOffId) {
        throw new BadRequestException('Write off Id is required')
      } else {

      const writeOffData = await this.checkWriteOffExist(input.name)

      if (writeOffData.length > 0) {
        if (writeOffData[0].id != writeOffId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'WriteOff', 'Update', input)

    let writeOff = this.data.writeOff.update({
      where: { id: writeOffId },
      data: {
  
                account: 
                input.accountId != null
                ? {
                        connect:  { 
                            id: input.accountId
                        }
                    }: undefined,  
                writeOffStatus: 
                input.writeOffStatusId != null
                ? {
                        connect:  { 
                            id: input.writeOffStatusId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
createdBy: input.createdBy, 
dateCreated: input.dateCreated, 

}
, include: {account: true, writeOffStatus: true} 
    })

    await this.data.logEvent(sendingUser, false, 'WriteOff', 'Update', writeOff)

    return writeOff

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Write off')
    }
  }

  async userUpdateWriteOffs(userId: string, input: UserUpdateWriteOffsInput): Promise<UpdateResult> {
    const total = input.writeOffs.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.writeOffs) {
      const inputData = input.writeOffs[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
accountId: inputData.accountId, 
writeOffStatusId: inputData.writeOffStatusId, 
amount: inputData.amount, 
createdBy: inputData.createdBy, 
dateCreated: inputData.dateCreated, 

      }

      const writeOffData = await this.checkWriteOffExist(inputData.name)

      if (writeOffData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.writeOff.upsert({
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


  async userDeleteWriteOff(userId: string, writeOffId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!writeOffId) {
        throw new BadRequestException('Write off Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'WriteOff', 'Delete', writeOffId)

        let writeOff = this.data.writeOff.delete({
          where: { id: writeOffId }
        })

        await this.data.logEvent(sendingUser, false, 'WriteOff', 'Delete', writeOff)

        return writeOff

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Write off')
    }
  }
}

