
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthGuidelineInput } from './dto/user-create-prior-auth-guideline.input'
import { UserListPriorAuthGuidelineInput } from './dto/user-list-prior-auth-guideline.input'
import { UserUpdatePriorAuthGuidelineInput } from './dto/user-update-prior-auth-guideline.input'
import { UserUpdatePriorAuthGuidelinesInput } from './dto/user-update-prior-auth-guidelines.input'

import { UserListGuidelineInput } from '@case-clinical/api/guideline/data-access'
import { UserListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'

@Injectable()
export class ApiPriorAuthGuidelineDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthGuidelines(userId: string, input?: UserListPriorAuthGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthGuideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input?.guidelineId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {guideline: true, priorAuthorizationRequest: true}
    })
  }

  async userSelectPriorAuthGuidelines(userId: string, input?: UserListPriorAuthGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthGuideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input?.guidelineId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthGuidelines(userId: string, input?: UserListPriorAuthGuidelineInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthGuideline.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            guidelineId: input?.guidelineId,
priorAuthorizationRequestId: input?.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthGuideline(userId: string, priorAuthGuidelineId) {

    return this.data.priorAuthGuideline.findUnique({ where: { id: priorAuthGuidelineId } , include: {guideline: true, priorAuthorizationRequest: true}  })
  }

  async checkPriorAuthGuidelineExist(priorAuthGuidelineName: string) {
    try {
      return this.data.priorAuthGuideline.findMany({ where: { name: priorAuthGuidelineName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthGuideline(userId: string, input: UserCreatePriorAuthGuidelineInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthGuidelineData = await this.checkPriorAuthGuidelineExist(input.name)

        if (priorAuthGuidelineData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PriorAuthGuideline', 'Create', input)

    let priorAuthGuideline = await this.data.priorAuthGuideline.create({
      data: { 
  
                guideline: 
                input.guidelineId != null
                ? {
                        connect:  { 
                            id: input.guidelineId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {guideline: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthGuideline', 'Create', priorAuthGuideline)

    return priorAuthGuideline

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Auth Guideline')
    }

  }


  
  

  async userUpdatePriorAuthGuideline(userId: string, priorAuthGuidelineId: string, input: UserUpdatePriorAuthGuidelineInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthGuidelineId) {
        throw new BadRequestException('Prior Auth Guideline Id is required')
      } else {

      const priorAuthGuidelineData = await this.checkPriorAuthGuidelineExist(input.name)

      if (priorAuthGuidelineData.length > 0) {
        if (priorAuthGuidelineData[0].id != priorAuthGuidelineId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PriorAuthGuideline', 'Update', input)

    let priorAuthGuideline = this.data.priorAuthGuideline.update({
      where: { id: priorAuthGuidelineId },
      data: {
  
                guideline: 
                input.guidelineId != null
                ? {
                        connect:  { 
                            id: input.guidelineId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {guideline: true, priorAuthorizationRequest: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthGuideline', 'Update', priorAuthGuideline)

    return priorAuthGuideline

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Auth Guideline')
    }
  }

  async userUpdatePriorAuthGuidelines(userId: string, input: UserUpdatePriorAuthGuidelinesInput): Promise<UpdateResult> {
    const total = input.priorAuthGuidelines.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthGuidelines) {
      const inputData = input.priorAuthGuidelines[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
guidelineId: inputData.guidelineId, 
priorAuthorizationRequestId: inputData.priorAuthorizationRequestId, 

      }

      const priorAuthGuidelineData = await this.checkPriorAuthGuidelineExist(inputData.name)

      if (priorAuthGuidelineData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthGuideline.upsert({
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


  async userDeletePriorAuthGuideline(userId: string, priorAuthGuidelineId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!priorAuthGuidelineId) {
        throw new BadRequestException('Prior Auth Guideline Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PriorAuthGuideline', 'Delete', priorAuthGuidelineId)

        let priorAuthGuideline = this.data.priorAuthGuideline.delete({
          where: { id: priorAuthGuidelineId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthGuideline', 'Delete', priorAuthGuideline)

        return priorAuthGuideline

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prior Auth Guideline')
    }
  }
}

