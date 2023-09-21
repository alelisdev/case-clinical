
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateAwardInput } from './dto/user-create-award.input'
import { UserListAwardInput } from './dto/user-list-award.input'
import { UserUpdateAwardInput } from './dto/user-update-award.input'
import { UserUpdateAwardsInput } from './dto/user-update-awards.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiAwardDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userAwards(userId: string, input?: UserListAwardInput) {
    let name = input?.name ? input.name : undefined

    return this.data.award.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async userSelectAwards(userId: string, input?: UserListAwardInput) {
    let name = input?.name ? input.name : undefined

    return this.data.award.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountAwards(userId: string, input?: UserListAwardInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.award.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userAward(userId: string, awardId) {

    return this.data.award.findUnique({ where: { id: awardId } , include: {clinicalProvider: true}  })
  }

  async checkAwardExist(awardName: string) {
    try {
      return this.data.award.findMany({ where: { name: awardName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateAward(userId: string, input: UserCreateAwardInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const awardData = await this.checkAwardExist(input.name)

        if (awardData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Award', 'Create', input)

    let award = await this.data.award.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
awardedAt: input.awardedAt, 
note: input.note, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Award', 'Create', award)

    return award

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Award')
    }

  }


  
  

  async userUpdateAward(userId: string, awardId: string, input: UserUpdateAwardInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!awardId) {
        throw new BadRequestException('Award Id is required')
      } else {

      const awardData = await this.checkAwardExist(input.name)

      if (awardData.length > 0) {
        if (awardData[0].id != awardId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Award', 'Update', input)

    let award = this.data.award.update({
      where: { id: awardId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
awardedAt: input.awardedAt, 
note: input.note, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Award', 'Update', award)

    return award

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Award')
    }
  }

  async userUpdateAwards(userId: string, input: UserUpdateAwardsInput): Promise<UpdateResult> {
    const total = input.awards.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.awards) {
      const inputData = input.awards[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
clinicalProviderId: inputData.clinicalProviderId, 
school: inputData.school, 
awardedAt: inputData.awardedAt, 
note: inputData.note, 

      }

      const awardData = await this.checkAwardExist(inputData.name)

      if (awardData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.award.upsert({
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


  async userDeleteAward(userId: string, awardId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!awardId) {
        throw new BadRequestException('Award Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Award', 'Delete', awardId)

        let award = this.data.award.delete({
          where: { id: awardId }
        })

        await this.data.logEvent(sendingUser, false, 'Award', 'Delete', award)

        return award

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Award')
    }
  }
}

