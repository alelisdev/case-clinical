
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactEmailInput } from './dto/user-create-contact-email.input'
import { UserListContactEmailInput } from './dto/user-list-contact-email.input'
import { UserUpdateContactEmailInput } from './dto/user-update-contact-email.input'
import { UserUpdateContactEmailsInput } from './dto/user-update-contact-emails.input'

import { UserListContactInput } from '@case-clinical/api/contact/data-access'

@Injectable()
export class ApiContactEmailDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContactEmails(userId: string, input?: UserListContactEmailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactEmail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async userSelectContactEmails(userId: string, input?: UserListContactEmailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactEmail.findMany({
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

  async userCountContactEmails(userId: string, input?: UserListContactEmailInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactEmail.count(
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

  async userContactEmail(userId: string, contactEmailId) {

    return this.data.contactEmail.findUnique({ where: { id: contactEmailId } , include: {contact: true}  })
  }

  async checkContactEmailExist(contactEmailName: string) {
    try {
      return this.data.contactEmail.findMany({ where: { name: contactEmailName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContactEmail(userId: string, input: UserCreateContactEmailInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contactEmailData = await this.checkContactEmailExist(input.name)

        if (contactEmailData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContactEmail', 'Create', input)

    let contactEmail = await this.data.contactEmail.create({
      data: { 
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,email: input.email, 
name: input.name, 

}
, include: {contact: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactEmail', 'Create', contactEmail)

    return contactEmail

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact Email')
    }

  }


  
  

  async userUpdateContactEmail(userId: string, contactEmailId: string, input: UserUpdateContactEmailInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactEmailId) {
        throw new BadRequestException('Contact Email Id is required')
      } else {

      const contactEmailData = await this.checkContactEmailExist(input.name)

      if (contactEmailData.length > 0) {
        if (contactEmailData[0].id != contactEmailId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContactEmail', 'Update', input)

    let contactEmail = this.data.contactEmail.update({
      where: { id: contactEmailId },
      data: {
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,email: input.email, 
name: input.name, 

}
, include: {contact: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactEmail', 'Update', contactEmail)

    return contactEmail

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact Email')
    }
  }

  async userUpdateContactEmails(userId: string, input: UserUpdateContactEmailsInput): Promise<UpdateResult> {
    const total = input.contactEmails.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contactEmails) {
      const inputData = input.contactEmails[key]

      const data = {
        id: inputData.id, 
email: inputData.email, 
name: inputData.name, 
contactId: inputData.contactId, 

      }

      const contactEmailData = await this.checkContactEmailExist(inputData.name)

      if (contactEmailData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contactEmail.upsert({
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


  async userDeleteContactEmail(userId: string, contactEmailId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactEmailId) {
        throw new BadRequestException('Contact Email Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ContactEmail', 'Delete', contactEmailId)

        let contactEmail = this.data.contactEmail.delete({
          where: { id: contactEmailId }
        })

        await this.data.logEvent(sendingUser, false, 'ContactEmail', 'Delete', contactEmail)

        return contactEmail

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact Email')
    }
  }
}

