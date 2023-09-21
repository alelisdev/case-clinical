
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactInput } from './dto/user-create-contact.input'
import { UserListContactInput } from './dto/user-list-contact.input'
import { UserUpdateContactInput } from './dto/user-update-contact.input'
import { UserUpdateContactsInput } from './dto/user-update-contacts.input'

import { UserListContactKindInput } from '@case-clinical/api/contact-kind/data-access'

@Injectable()
export class ApiContactDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContacts(userId: string, input?: UserListContactInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contact.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input?.contactKindId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contactKind: true}
    })
  }

  async userSelectContacts(userId: string, input?: UserListContactInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contact.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input?.contactKindId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContacts(userId: string, input?: UserListContactInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contact.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input?.contactKindId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContact(userId: string, contactId) {

    return this.data.contact.findUnique({ where: { id: contactId } , include: {contactKind: true, emails: {include: {contact: true}}, phoneNumbers: {include: {country: true, contact: true}}, contactSettings: {include: {contact: true, integration: true}}, tags: {include: {contact: true}}, implants: {include: {implantCategory: true, salesRepresentative: true, manufacturer: true}}}  })
  }

  async checkContactExist(contactName: string) {
    try {
      return this.data.contact.findMany({ where: { name: contactName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContact(userId: string, input: UserCreateContactInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try { 

    await this.data.logEvent(sendingUser, true, 'Contact', 'Create', input)

    let contact = await this.data.contact.create({
      data: { 
  
                contactKind: 
                input.contactKindId != null
                ? {
                        connect:  { 
                            id: input.contactKindId
                        }
                    }: undefined,name: input.name, 
honorific: input.honorific, 
firstName: input.firstName, 
lastName: input.lastName, 
suffix: input.suffix, 
primaryPhoneNumber: input.primaryPhoneNumber, 
primaryEmailAddress: input.primaryEmailAddress, 
primaryAddressLine1: input.primaryAddressLine1, 
primaryAddressLine2: input.primaryAddressLine2, 
primaryAddressCity: input.primaryAddressCity, 
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince, 
primaryAddressPostalCode: input.primaryAddressPostalCode, 
notes: input.notes, 
discriminator: input.discriminator, 
dateOfBirth: input.dateOfBirth, 
latitude: input.latitude, 
longitude: input.longitude, 
avatar: input.avatar, 
background: input.background, 
title: input.title, 
company: input.company, 
birthday: input.birthday, 
address: input.address, 

}
, include: {contactKind: true, emails: true, phoneNumbers: true, contactSettings: true, tags: true, implants: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Contact', 'Create', contact)

    return contact

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact')
    }

  }


  
  

  async userUpdateContact(userId: string, contactId: string, input: UserUpdateContactInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactId) {
        throw new BadRequestException('Contact Id is required')
      } else { 


    await this.data.logEvent(sendingUser, true, 'Contact', 'Update', input)

    let contact = this.data.contact.update({
      where: { id: contactId },
      data: {
  
                contactKind: 
                input.contactKindId != null
                ? {
                        connect:  { 
                            id: input.contactKindId
                        }
                    }: undefined,name: input.name, 
honorific: input.honorific, 
firstName: input.firstName, 
lastName: input.lastName, 
suffix: input.suffix, 
primaryPhoneNumber: input.primaryPhoneNumber, 
primaryEmailAddress: input.primaryEmailAddress, 
primaryAddressLine1: input.primaryAddressLine1, 
primaryAddressLine2: input.primaryAddressLine2, 
primaryAddressCity: input.primaryAddressCity, 
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince, 
primaryAddressPostalCode: input.primaryAddressPostalCode, 
notes: input.notes, 
discriminator: input.discriminator, 
dateOfBirth: input.dateOfBirth, 
latitude: input.latitude, 
longitude: input.longitude, 
avatar: input.avatar, 
background: input.background, 
title: input.title, 
company: input.company, 
birthday: input.birthday, 
address: input.address, 

}
, include: {contactKind: true, emails: true, phoneNumbers: true, contactSettings: true, tags: true, implants: true} 
    })

    await this.data.logEvent(sendingUser, false, 'Contact', 'Update', contact)

    return contact

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact')
    }
  }

  async userUpdateContacts(userId: string, input: UserUpdateContactsInput): Promise<UpdateResult> {
    const total = input.contacts.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contacts) {
      const inputData = input.contacts[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
honorific: inputData.honorific, 
firstName: inputData.firstName, 
lastName: inputData.lastName, 
suffix: inputData.suffix, 
primaryPhoneNumber: inputData.primaryPhoneNumber, 
primaryEmailAddress: inputData.primaryEmailAddress, 
primaryAddressLine1: inputData.primaryAddressLine1, 
primaryAddressLine2: inputData.primaryAddressLine2, 
primaryAddressCity: inputData.primaryAddressCity, 
primaryAddressStateOrProvince: inputData.primaryAddressStateOrProvince, 
primaryAddressPostalCode: inputData.primaryAddressPostalCode, 
notes: inputData.notes, 
discriminator: inputData.discriminator, 
contactKindId: inputData.contactKindId, 
dateOfBirth: inputData.dateOfBirth, 
latitude: inputData.latitude, 
longitude: inputData.longitude, 
avatar: inputData.avatar, 
background: inputData.background, 
title: inputData.title, 
company: inputData.company, 
birthday: inputData.birthday, 
address: inputData.address, 

      }

      const contactData = await this.checkContactExist(inputData.name)

      if (contactData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contact.upsert({
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


  async userDeleteContact(userId: string, contactId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactId) {
        throw new BadRequestException('Contact Id is required')
      } else {

        const contactEmailCount = await this.data.contactEmail.count({ where: { contactId: contactId }})
        if(contactEmailCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Email')
        }


        const contactPhoneNumberCount = await this.data.contactPhoneNumber.count({ where: { contactId: contactId }})
        if(contactPhoneNumberCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Phone Number')
        }


        const contactSettingCount = await this.data.contactSetting.count({ where: { contactId: contactId }})
        if(contactSettingCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Setting')
        }


        const contactTagCount = await this.data.contactTag.count({ where: { contactId: contactId }})
        if(contactTagCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contact Tag')
        }


        const implantCount = await this.data.implant.count({ where: { salesRepresentativeId: contactId }})
        if(implantCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Implant')
        }

        await this.data.logEvent(sendingUser, true, 'Contact', 'Delete', contactId)

        let contact = this.data.contact.delete({
          where: { id: contactId }
        })

        await this.data.logEvent(sendingUser, false, 'Contact', 'Delete', contact)

        return contact

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact')
    }
  }
}

