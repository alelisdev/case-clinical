
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateTagInput } from './dto/user-create-tag.input'
import { UserListTagInput } from './dto/user-list-tag.input'
import { UserUpdateTagInput } from './dto/user-update-tag.input'
import { UserUpdateTagsInput } from './dto/user-update-tags.input'



@Injectable()
export class ApiTagDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userTags(userId: string, input?: UserListTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.tag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectTags(userId: string, input?: UserListTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.tag.findMany({
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

  async userCountTags(userId: string, input?: UserListTagInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.tag.count(
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

  async userTag(userId: string, tagId) {

    return this.data.tag.findUnique({ where: { id: tagId } , include: {clinicalProviderTags: true, taskTags: true}  })
  }

  async checkTagExist(tagName: string) {
    try {
      return this.data.tag.findMany({ where: { name: tagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateTag(userId: string, input: UserCreateTagInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const tagData = await this.checkTagExist(input.name)

        if (tagData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Tag', 'Create', input)

    let tag = await this.data.tag.create({
      data: { 
name: input.name, 

}
, include: {clinicalProviderTags: true, taskTags: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Tag', 'Create', tag)

    return tag

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Tag')
    }

  }


  
  

  async userUpdateTag(userId: string, tagId: string, input: UserUpdateTagInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!tagId) {
        throw new BadRequestException('Tag Id is required')
      } else {

      const tagData = await this.checkTagExist(input.name)

      if (tagData.length > 0) {
        if (tagData[0].id != tagId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Tag', 'Update', input)

    let tag = this.data.tag.update({
      where: { id: tagId },
      data: {
name: input.name, 

}
, include: {clinicalProviderTags: true, taskTags: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Tag', 'Update', tag)

    return tag

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Tag')
    }
  }

  async userUpdateTags(userId: string, input: UserUpdateTagsInput): Promise<UpdateResult> {
    const total = input.tags.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.tags) {
      const inputData = input.tags[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const tagData = await this.checkTagExist(inputData.name)

      if (tagData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.tag.upsert({
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


  async userDeleteTag(userId: string, tagId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!tagId) {
        throw new BadRequestException('Tag Id is required')
      } else {


        const clinicalProviderTagCount = await this.data.clinicalProviderTag.count({ where: { tagId: tagId }})
        if(clinicalProviderTagCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Clinical Provider Tag')
        }


        const taskTagCount = await this.data.taskTag.count({ where: { tagId: tagId }})
        if(taskTagCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Task Tag')
        }


        await this.data.logEvent(sendingUser, true, 'Tag', 'Delete', tagId)

        let tag = this.data.tag.delete({
          where: { id: tagId }
        })

        await this.data.logEvent(sendingUser, false, 'Tag', 'Delete', tag)

        return tag

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Tag')
    }
  }
}

