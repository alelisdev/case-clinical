
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAuthorizationStatusInput } from './dto/user-create-authorization-status.input'
import { UserListAuthorizationStatusInput } from './dto/user-list-authorization-status.input'
import { UserUpdateAuthorizationStatusInput } from './dto/user-update-authorization-status.input'
import { UserUpdateAuthorizationStatusesInput } from './dto/user-update-authorization-statuses.input'



@Injectable()
export class ApiAuthorizationStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAuthorizationStatuses(userId: string, input?: UserListAuthorizationStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectAuthorizationStatuses(userId: string, input?: UserListAuthorizationStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationStatus.findMany({
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

  async userCountAuthorizationStatuses(userId: string, input?: UserListAuthorizationStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationStatus.count(
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

  async userAuthorizationStatus(userId: string, authorizationStatusId) {

    return this.data.authorizationStatus.findUnique({ where: { id: authorizationStatusId } , include: {priorAuthorizationRequests: {include: {procedureSite: true, 
      surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true}}}  })
  }

  async checkAuthorizationStatusExist(authorizationStatusName: string) {
    try {
      return this.data.authorizationStatus.findMany({ where: { name: authorizationStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAuthorizationStatus(userId: string, input: UserCreateAuthorizationStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const authorizationStatusData = await this.checkAuthorizationStatusExist(input.name)

        if (authorizationStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'AuthorizationStatus', 'Create', input)

    let authorizationStatus = await this.data.authorizationStatus.create({
      data: { 
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationStatus', 'Create', authorizationStatus)

    return authorizationStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Authorization Status')
    }

  }


  
  

  async userUpdateAuthorizationStatus(userId: string, authorizationStatusId: string, input: UserUpdateAuthorizationStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!authorizationStatusId) {
        throw new BadRequestException('Authorization Status Id is required')
      } else {

      const authorizationStatusData = await this.checkAuthorizationStatusExist(input.name)

      if (authorizationStatusData.length > 0) {
        if (authorizationStatusData[0].id != authorizationStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'AuthorizationStatus', 'Update', input)

    let authorizationStatus = this.data.authorizationStatus.update({
      where: { id: authorizationStatusId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true,
   authorizationStatus: true,  patient: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'AuthorizationStatus', 'Update', authorizationStatus)

    return authorizationStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Authorization Status')
    }
  }

  async userUpdateAuthorizationStatuses(userId: string, input: UserUpdateAuthorizationStatusesInput): Promise<UpdateResult> {
    const total = input.authorizationStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.authorizationStatuses) {
      const inputData = input.authorizationStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const authorizationStatusData = await this.checkAuthorizationStatusExist(inputData.name)

      if (authorizationStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.authorizationStatus.upsert({
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


  async userDeleteAuthorizationStatus(userId: string, authorizationStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!authorizationStatusId) {
        throw new BadRequestException('Authorization Status Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { authorizationStatusId: authorizationStatusId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        await this.data.logEvent(sendingUser, true, 'AuthorizationStatus', 'Delete', authorizationStatusId)

        let authorizationStatus = this.data.authorizationStatus.delete({
          where: { id: authorizationStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'AuthorizationStatus', 'Delete', authorizationStatus)

        return authorizationStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Authorization Status')
    }
  }
}

