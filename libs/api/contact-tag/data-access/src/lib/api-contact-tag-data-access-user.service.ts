
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactTagInput } from './dto/user-create-contact-tag.input'
import { UserListContactTagInput } from './dto/user-list-contact-tag.input'
import { UserUpdateContactTagInput } from './dto/user-update-contact-tag.input'
import { UserUpdateContactTagsInput } from './dto/user-update-contact-tags.input'

import { UserListContactInput } from '@case-clinical/api/contact/data-access'

@Injectable()
export class ApiContactTagDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContactTags(userId: string, input?: UserListContactTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async userSelectContactTags(userId: string, input?: UserListContactTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContactTags(userId: string, input?: UserListContactTagInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactTag.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContactTag(userId: string, contactTagId) {

    return this.data.contactTag.findUnique({ where: { id: contactTagId } , include: {contact: true}  })
  }

  async checkContactTagExist(contactTagName: string) {
    try {
      return this.data.contactTag.findMany({ where: { name: contactTagName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContactTag(userId: string, input: UserCreateContactTagInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contactTagData = await this.checkContactTagExist(input.name)

        if (contactTagData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContactTag', 'Create', input)

    let contactTag = await this.data.contactTag.create({
      data: { 
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 

}
, include: {contact: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactTag', 'Create', contactTag)

    return contactTag

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact Tag')
    }

  }


  
  

  async userUpdateContactTag(userId: string, contactTagId: string, input: UserUpdateContactTagInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactTagId) {
        throw new BadRequestException('Contact Tag Id is required')
      } else {

      const contactTagData = await this.checkContactTagExist(input.name)

      if (contactTagData.length > 0) {
        if (contactTagData[0].id != contactTagId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContactTag', 'Update', input)

    let contactTag = this.data.contactTag.update({
      where: { id: contactTagId },
      data: {
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 

}
, include: {contact: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactTag', 'Update', contactTag)

    return contactTag

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact Tag')
    }
  }

  async userUpdateContactTags(userId: string, input: UserUpdateContactTagsInput): Promise<UpdateResult> {
    const total = input.contactTags.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contactTags) {
      const inputData = input.contactTags[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
contactId: inputData.contactId, 

      }

      const contactTagData = await this.checkContactTagExist(inputData.name)

      if (contactTagData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contactTag.upsert({
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


  async userDeleteContactTag(userId: string, contactTagId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactTagId) {
        throw new BadRequestException('Contact Tag Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ContactTag', 'Delete', contactTagId)

        let contactTag = this.data.contactTag.delete({
          where: { id: contactTagId }
        })

        await this.data.logEvent(sendingUser, false, 'ContactTag', 'Delete', contactTag)

        return contactTag

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact Tag')
    }
  }
}

