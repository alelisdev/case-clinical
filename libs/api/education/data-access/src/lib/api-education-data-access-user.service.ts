
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateEducationInput } from './dto/user-create-education.input'
import { UserListEducationInput } from './dto/user-list-education.input'
import { UserUpdateEducationInput } from './dto/user-update-education.input'
import { UserUpdateEducationsInput } from './dto/user-update-educations.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiEducationDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userEducations(userId: string, input?: UserListEducationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.education.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async userSelectEducations(userId: string, input?: UserListEducationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.education.findMany({
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

  async userCountEducations(userId: string, input?: UserListEducationInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.education.count(
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

  async userEducation(userId: string, educationId) {

    return this.data.education.findUnique({ where: { id: educationId } , include: {clinicalProvider: true}  })
  }

  async checkEducationExist(educationName: string) {
    try {
      return this.data.education.findMany({ where: { name: educationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateEducation(userId: string, input: UserCreateEducationInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const educationData = await this.checkEducationExist(input.name)

        if (educationData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Education', 'Create', input)

    let education = await this.data.education.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
degree: input.degree, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Education', 'Create', education)

    return education

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Education')
    }

  }


  
  

  async userUpdateEducation(userId: string, educationId: string, input: UserUpdateEducationInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!educationId) {
        throw new BadRequestException('Education Id is required')
      } else {

      const educationData = await this.checkEducationExist(input.name)

      if (educationData.length > 0) {
        if (educationData[0].id != educationId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Education', 'Update', input)

    let education = this.data.education.update({
      where: { id: educationId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
degree: input.degree, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Education', 'Update', education)

    return education

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Education')
    }
  }

  async userUpdateEducations(userId: string, input: UserUpdateEducationsInput): Promise<UpdateResult> {
    const total = input.educations.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.educations) {
      const inputData = input.educations[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
clinicalProviderId: inputData.clinicalProviderId, 
school: inputData.school, 
degree: inputData.degree, 
from: inputData.from, 
to: inputData.to, 

      }

      const educationData = await this.checkEducationExist(inputData.name)

      if (educationData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.education.upsert({
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


  async userDeleteEducation(userId: string, educationId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!educationId) {
        throw new BadRequestException('Education Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Education', 'Delete', educationId)

        let education = this.data.education.delete({
          where: { id: educationId }
        })

        await this.data.logEvent(sendingUser, false, 'Education', 'Delete', education)

        return education

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Education')
    }
  }
}

