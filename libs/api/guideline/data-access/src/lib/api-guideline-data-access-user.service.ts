
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateGuidelineInput } from './dto/user-create-guideline.input'
import { UserListGuidelineInput } from './dto/user-list-guideline.input'
import { UserUpdateGuidelineInput } from './dto/user-update-guideline.input'
import { UserUpdateGuidelinesInput } from './dto/user-update-guidelines.input'



@Injectable()
export class ApiGuidelineDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userGuidelines(userId: string, input?: UserListGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guideline.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectGuidelines(userId: string, input?: UserListGuidelineInput) {
    let name = input?.name ? input.name : undefined

    return this.data.guideline.findMany({
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

  async userCountGuidelines(userId: string, input?: UserListGuidelineInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.guideline.count(
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

  async userGuideline(userId: string, guidelineId) {

    return this.data.guideline.findUnique({ where: { id: guidelineId } , include: {priorAuthGuidelines: {include: {guideline: true, priorAuthorizationRequest: true}}}  })
  }

  async checkGuidelineExist(guidelineName: string) {
    try {
      return this.data.guideline.findMany({ where: { name: guidelineName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateGuideline(userId: string, input: UserCreateGuidelineInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const guidelineData = await this.checkGuidelineExist(input.name)

        if (guidelineData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Guideline', 'Create', input)

    let guideline = await this.data.guideline.create({
      data: { 
name: input.name, 

}
, include: {priorAuthGuidelines: {include: {guideline: true, priorAuthorizationRequest: true}}} 
    })

    await this.data.logEvent(sendingUser, false, 'Guideline', 'Create', guideline)

    return guideline

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Guideline')
    }

  }


  
  

  async userUpdateGuideline(userId: string, guidelineId: string, input: UserUpdateGuidelineInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!guidelineId) {
        throw new BadRequestException('Guideline Id is required')
      } else {

      const guidelineData = await this.checkGuidelineExist(input.name)

      if (guidelineData.length > 0) {
        if (guidelineData[0].id != guidelineId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Guideline', 'Update', input)

    let guideline = this.data.guideline.update({
      where: { id: guidelineId },
      data: {
name: input.name, 

}
, include: {priorAuthGuidelines: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Guideline', 'Update', guideline)

    return guideline

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Guideline')
    }
  }

  async userUpdateGuidelines(userId: string, input: UserUpdateGuidelinesInput): Promise<UpdateResult> {
    const total = input.guidelines.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.guidelines) {
      const inputData = input.guidelines[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const guidelineData = await this.checkGuidelineExist(inputData.name)

      if (guidelineData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.guideline.upsert({
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


  async userDeleteGuideline(userId: string, guidelineId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!guidelineId) {
        throw new BadRequestException('Guideline Id is required')
      } else {

        const priorAuthGuidelineCount = await this.data.priorAuthGuideline.count({ where: { guidelineId: guidelineId }})
        if(priorAuthGuidelineCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Auth Guideline')
        }

        await this.data.logEvent(sendingUser, true, 'Guideline', 'Delete', guidelineId)

        let guideline = this.data.guideline.delete({
          where: { id: guidelineId }
        })

        await this.data.logEvent(sendingUser, false, 'Guideline', 'Delete', guideline)

        return guideline

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Guideline')
    }
  }
}

