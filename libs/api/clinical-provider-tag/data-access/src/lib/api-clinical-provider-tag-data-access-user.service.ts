
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateClinicalProviderTagInput } from './dto/user-create-clinical-provider-tag.input'
import { UserListClinicalProviderTagInput } from './dto/user-list-clinical-provider-tag.input'
import { UserUpdateClinicalProviderTagInput } from './dto/user-update-clinical-provider-tag.input'
import { UserUpdateClinicalProviderTagsInput } from './dto/user-update-clinical-provider-tags.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserListTagInput } from '@case-clinical/api/tag/data-access'

@Injectable()
export class ApiClinicalProviderTagDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userClinicalProviderTags(userId: string, input?: UserListClinicalProviderTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,
tagId: input?.tagId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, tag: true}
    })
  }

  async userSelectClinicalProviderTags(userId: string, input?: UserListClinicalProviderTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,
tagId: input?.tagId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountClinicalProviderTags(userId: string, input?: UserListClinicalProviderTagInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderTag.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,
tagId: input?.tagId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userClinicalProviderTag(userId: string, clinicalProviderTagId) {

    return this.data.clinicalProviderTag.findUnique({ where: { id: clinicalProviderTagId } , include: {clinicalProvider: true, tag: true}  })
  }

  async checkClinicalProviderTagExist(clinicalProviderTagName: string) {
    try {
      return this.data.clinicalProviderTag.findMany({ where: { name: clinicalProviderTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateClinicalProviderTag(userId: string, input: UserCreateClinicalProviderTagInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const clinicalProviderTagData = await this.checkClinicalProviderTagExist(input.name)

        if (clinicalProviderTagData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderTag', 'Create', input)

    let clinicalProviderTag = await this.data.clinicalProviderTag.create({
      data: { 
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, tag: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderTag', 'Create', clinicalProviderTag)

    return clinicalProviderTag

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Clinical Provider Tag')
    }

  }


  
  

  async userUpdateClinicalProviderTag(userId: string, clinicalProviderTagId: string, input: UserUpdateClinicalProviderTagInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!clinicalProviderTagId) {
        throw new BadRequestException('Clinical Provider Tag Id is required')
      } else {

      const clinicalProviderTagData = await this.checkClinicalProviderTagExist(input.name)

      if (clinicalProviderTagData.length > 0) {
        if (clinicalProviderTagData[0].id != clinicalProviderTagId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ClinicalProviderTag', 'Update', input)

    let clinicalProviderTag = this.data.clinicalProviderTag.update({
      where: { id: clinicalProviderTagId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                tag: 
                input.tagId != null
                ? {
                        connect:  { 
                            id: input.tagId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, tag: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ClinicalProviderTag', 'Update', clinicalProviderTag)

    return clinicalProviderTag

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Clinical Provider Tag')
    }
  }

  async userUpdateClinicalProviderTags(userId: string, input: UserUpdateClinicalProviderTagsInput): Promise<UpdateResult> {
    const total = input.clinicalProviderTags.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.clinicalProviderTags) {
      const inputData = input.clinicalProviderTags[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
clinicalProviderId: inputData.clinicalProviderId, 
tagId: inputData.tagId, 

      }

      const clinicalProviderTagData = await this.checkClinicalProviderTagExist(inputData.name)

      if (clinicalProviderTagData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.clinicalProviderTag.upsert({
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


  async userDeleteClinicalProviderTag(userId: string, clinicalProviderTagId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!clinicalProviderTagId) {
        throw new BadRequestException('Clinical Provider Tag Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ClinicalProviderTag', 'Delete', clinicalProviderTagId)

        let clinicalProviderTag = this.data.clinicalProviderTag.delete({
          where: { id: clinicalProviderTagId }
        })

        await this.data.logEvent(sendingUser, false, 'ClinicalProviderTag', 'Delete', clinicalProviderTag)

        return clinicalProviderTag

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Clinical Provider Tag')
    }
  }
}

