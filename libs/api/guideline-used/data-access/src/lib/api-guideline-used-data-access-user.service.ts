
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateGuidelineUsedInput } from './dto/user-create-guideline-used.input'
import { UserListGuidelineUsedInput } from './dto/user-list-guideline-used.input'
import { UserUpdateGuidelineUsedInput } from './dto/user-update-guideline-used.input'
import { UserUpdateGuidelineUsedsInput } from './dto/user-update-guideline-useds.input'



@Injectable()
export class ApiGuidelineUsedDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userGuidelineUseds(userId: string, input?: UserListGuidelineUsedInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guidelineUsed.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectGuidelineUseds(userId: string, input?: UserListGuidelineUsedInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guidelineUsed.findMany({
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

  async userCountGuidelineUseds(userId: string, input?: UserListGuidelineUsedInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.guidelineUsed.count(
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

  async userGuidelineUsed(userId: string, guidelineUsedId) {

    return this.data.guidelineUsed.findUnique({ where: { id: guidelineUsedId } , include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true,  patient: true}}}  })
  }

  async checkGuidelineUsedExist(guidelineUsedName: string) {
    try {
      return this.data.guidelineUsed.findMany({ where: { name: guidelineUsedName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateGuidelineUsed(userId: string, input: UserCreateGuidelineUsedInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const guidelineUsedData = await this.checkGuidelineUsedExist(input.name)

        if (guidelineUsedData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'GuidelineUsed', 'Create', input)

    let guidelineUsed = await this.data.guidelineUsed.create({
      data: { 
name: input.name, 

}
, include: {priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true,  patient: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'GuidelineUsed', 'Create', guidelineUsed)

    return guidelineUsed

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Guideline Used')
    }

  }


  
  

  async userUpdateGuidelineUsed(userId: string, guidelineUsedId: string, input: UserUpdateGuidelineUsedInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!guidelineUsedId) {
        throw new BadRequestException('Guideline Used Id is required')
      } else {

      const guidelineUsedData = await this.checkGuidelineUsedExist(input.name)

      if (guidelineUsedData.length > 0) {
        if (guidelineUsedData[0].id != guidelineUsedId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'GuidelineUsed', 'Update', input)

    let guidelineUsed = this.data.guidelineUsed.update({
      where: { id: guidelineUsedId },
      data: {
name: input.name, 

}
, include: {priorAuthorizationRequests: true} 
    })

    await this.data.logEvent(sendingUser, false, 'GuidelineUsed', 'Update', guidelineUsed)

    return guidelineUsed

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Guideline Used')
    }
  }

  async userUpdateGuidelineUseds(userId: string, input: UserUpdateGuidelineUsedsInput): Promise<UpdateResult> {
    const total = input.guidelineUseds.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.guidelineUseds) {
      const inputData = input.guidelineUseds[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const guidelineUsedData = await this.checkGuidelineUsedExist(inputData.name)

      if (guidelineUsedData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.guidelineUsed.upsert({
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


  async userDeleteGuidelineUsed(userId: string, guidelineUsedId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!guidelineUsedId) {
        throw new BadRequestException('Guideline Used Id is required')
      } else {

        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { guidelineUsedId: guidelineUsedId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }

        await this.data.logEvent(sendingUser, true, 'GuidelineUsed', 'Delete', guidelineUsedId)

        let guidelineUsed = this.data.guidelineUsed.delete({
          where: { id: guidelineUsedId }
        })

        await this.data.logEvent(sendingUser, false, 'GuidelineUsed', 'Delete', guidelineUsed)

        return guidelineUsed

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Guideline Used')
    }
  }
}

