
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateSurgicalPositionInput } from './dto/user-create-surgical-position.input'
import { UserListSurgicalPositionInput } from './dto/user-list-surgical-position.input'
import { UserUpdateSurgicalPositionInput } from './dto/user-update-surgical-position.input'
import { UserUpdateSurgicalPositionsInput } from './dto/user-update-surgical-positions.input'



@Injectable()
export class ApiSurgicalPositionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userSurgicalPositions(userId: string, input?: UserListSurgicalPositionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.surgicalPosition.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectSurgicalPositions(userId: string, input?: UserListSurgicalPositionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.surgicalPosition.findMany({
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

  async userCountSurgicalPositions(userId: string, input?: UserListSurgicalPositionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.surgicalPosition.count(
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

  async userSurgicalPosition(userId: string, surgicalPositionId) {

    return this.data.surgicalPosition.findUnique({ where: { id: surgicalPositionId } , include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true}}}  })
  }

  async checkSurgicalPositionExist(surgicalPositionName: string) {
    try {
      return this.data.surgicalPosition.findMany({ where: { name: surgicalPositionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateSurgicalPosition(userId: string, input: UserCreateSurgicalPositionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const surgicalPositionData = await this.checkSurgicalPositionExist(input.name)

        if (surgicalPositionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'SurgicalPosition', 'Create', input)

    let surgicalPosition = await this.data.surgicalPosition.create({
      data: { 
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'SurgicalPosition', 'Create', surgicalPosition)

    return surgicalPosition

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Surgical Position')
    }

  }


  
  

  async userUpdateSurgicalPosition(userId: string, surgicalPositionId: string, input: UserUpdateSurgicalPositionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!surgicalPositionId) {
        throw new BadRequestException('Surgical Position Id is required')
      } else {

      const surgicalPositionData = await this.checkSurgicalPositionExist(input.name)

      if (surgicalPositionData.length > 0) {
        if (surgicalPositionData[0].id != surgicalPositionId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'SurgicalPosition', 'Update', input)

    let surgicalPosition = this.data.surgicalPosition.update({
      where: { id: surgicalPositionId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'SurgicalPosition', 'Update', surgicalPosition)

    return surgicalPosition

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Surgical Position')
    }
  }

  async userUpdateSurgicalPositions(userId: string, input: UserUpdateSurgicalPositionsInput): Promise<UpdateResult> {
    const total = input.surgicalPositions.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.surgicalPositions) {
      const inputData = input.surgicalPositions[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const surgicalPositionData = await this.checkSurgicalPositionExist(inputData.name)

      if (surgicalPositionData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.surgicalPosition.upsert({
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


  async userDeleteSurgicalPosition(userId: string, surgicalPositionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!surgicalPositionId) {
        throw new BadRequestException('Surgical Position Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { surgicalPositionId: surgicalPositionId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        await this.data.logEvent(sendingUser, true, 'SurgicalPosition', 'Delete', surgicalPositionId)

        let surgicalPosition = this.data.surgicalPosition.delete({
          where: { id: surgicalPositionId }
        })

        await this.data.logEvent(sendingUser, false, 'SurgicalPosition', 'Delete', surgicalPosition)

        return surgicalPosition

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Surgical Position')
    }
  }
}

