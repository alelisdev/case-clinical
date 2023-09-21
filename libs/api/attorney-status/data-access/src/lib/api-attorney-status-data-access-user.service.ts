
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAttorneyStatusInput } from './dto/user-create-attorney-status.input'
import { UserListAttorneyStatusInput } from './dto/user-list-attorney-status.input'
import { UserUpdateAttorneyStatusInput } from './dto/user-update-attorney-status.input'
import { UserUpdateAttorneyStatusesInput } from './dto/user-update-attorney-statuses.input'



@Injectable()
export class ApiAttorneyStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAttorneyStatuses(userId: string, input?: UserListAttorneyStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAttorneyStatuses(userId: string, input?: UserListAttorneyStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyStatus.findMany({
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

  async userCountAttorneyStatuses(userId: string, input?: UserListAttorneyStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyStatus.count(
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

  async userAttorneyStatus(userId: string, attorneyStatusId) {

    return this.data.attorneyStatus.findUnique({ where: { id: attorneyStatusId } , include: {attorneys: {include: {firm: true, attorneyStatus: true, attorneyType: true}}}  })
  }

  async checkAttorneyStatusExist(attorneyStatusName: string) {
    try {
      return this.data.attorneyStatus.findMany({ where: { name: attorneyStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAttorneyStatus(userId: string, input: UserCreateAttorneyStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const attorneyStatusData = await this.checkAttorneyStatusExist(input.name)

        if (attorneyStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AttorneyStatus', 'Create', input)

    let attorneyStatus = await this.data.attorneyStatus.create({
      data: { 
name: input.name, 

}
, include: {attorneys: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AttorneyStatus', 'Create', attorneyStatus)

    return attorneyStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Attorney Status')
    }

  }


  
  

  async userUpdateAttorneyStatus(userId: string, attorneyStatusId: string, input: UserUpdateAttorneyStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!attorneyStatusId) {
        throw new BadRequestException('Attorney Status Id is required')
      } else {

      const attorneyStatusData = await this.checkAttorneyStatusExist(input.name)

      if (attorneyStatusData.length > 0) {
        if (attorneyStatusData[0].id != attorneyStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AttorneyStatus', 'Update', input)

    let attorneyStatus = this.data.attorneyStatus.update({
      where: { id: attorneyStatusId },
      data: {
name: input.name, 

}
, include: {attorneys: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AttorneyStatus', 'Update', attorneyStatus)

    return attorneyStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Attorney Status')
    }
  }

  async userUpdateAttorneyStatuses(userId: string, input: UserUpdateAttorneyStatusesInput): Promise<UpdateResult> {
    const total = input.attorneyStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.attorneyStatuses) {
      const inputData = input.attorneyStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const attorneyStatusData = await this.checkAttorneyStatusExist(inputData.name)

      if (attorneyStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.attorneyStatus.upsert({
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


  async userDeleteAttorneyStatus(userId: string, attorneyStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!attorneyStatusId) {
        throw new BadRequestException('Attorney Status Id is required')
      } else {

        const attorneyCount = await this.data.attorney.count({ where: { attorneyStatusId: attorneyStatusId }})
        if(attorneyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Attorney')
        }

        await this.data.logEvent(sendingUser, true, 'AttorneyStatus', 'Delete', attorneyStatusId)

        let attorneyStatus = this.data.attorneyStatus.delete({
          where: { id: attorneyStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'AttorneyStatus', 'Delete', attorneyStatus)

        return attorneyStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Attorney Status')
    }
  }
}

