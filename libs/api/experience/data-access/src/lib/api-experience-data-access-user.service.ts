
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateExperienceInput } from './dto/user-create-experience.input'
import { UserListExperienceInput } from './dto/user-list-experience.input'
import { UserUpdateExperienceInput } from './dto/user-update-experience.input'
import { UserUpdateExperiencesInput } from './dto/user-update-experiences.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiExperienceDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userExperiences(userId: string, input?: UserListExperienceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.experience.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async userSelectExperiences(userId: string, input?: UserListExperienceInput) {
    let name = input?.name ? input.name : undefined

    return this.data.experience.findMany({
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

  async userCountExperiences(userId: string, input?: UserListExperienceInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.experience.count(
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

  async userExperience(userId: string, experienceId) {

    return this.data.experience.findUnique({ where: { id: experienceId } , include: {clinicalProvider: true}  })
  }

  async checkExperienceExist(experienceName: string) {
    try {
      return this.data.experience.findMany({ where: { name: experienceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateExperience(userId: string, input: UserCreateExperienceInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const experienceData = await this.checkExperienceExist(input.name)

        if (experienceData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Experience', 'Create', input)

    let experience = await this.data.experience.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,createdAt: input.createdAt, 
updatedAt: input.updatedAt, 
name: input.name, 
workplace: input.workplace, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Experience', 'Create', experience)

    return experience

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Experience')
    }

  }


  
  

  async userUpdateExperience(userId: string, experienceId: string, input: UserUpdateExperienceInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!experienceId) {
        throw new BadRequestException('Experience Id is required')
      } else {

      const experienceData = await this.checkExperienceExist(input.name)

      if (experienceData.length > 0) {
        if (experienceData[0].id != experienceId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Experience', 'Update', input)

    let experience = this.data.experience.update({
      where: { id: experienceId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,createdAt: input.createdAt, 
updatedAt: input.updatedAt, 
name: input.name, 
workplace: input.workplace, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Experience', 'Update', experience)

    return experience

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Experience')
    }
  }

  async userUpdateExperiences(userId: string, input: UserUpdateExperiencesInput): Promise<UpdateResult> {
    const total = input.experiences.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.experiences) {
      const inputData = input.experiences[key]

      const data = {
        id: inputData.id, 
createdAt: inputData.createdAt, 
updatedAt: inputData.updatedAt, 
name: inputData.name, 
clinicalProviderId: inputData.clinicalProviderId, 
workplace: inputData.workplace, 
from: inputData.from, 
to: inputData.to, 

      }

      const experienceData = await this.checkExperienceExist(inputData.name)

      if (experienceData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.experience.upsert({
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


  async userDeleteExperience(userId: string, experienceId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!experienceId) {
        throw new BadRequestException('Experience Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Experience', 'Delete', experienceId)

        let experience = this.data.experience.delete({
          where: { id: experienceId }
        })

        await this.data.logEvent(sendingUser, false, 'Experience', 'Delete', experience)

        return experience

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Experience')
    }
  }
}

