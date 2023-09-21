
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactInput } from './dto/admin-create-contact.input'
import { AdminListContactInput } from './dto/admin-list-contact.input'
import { AdminListContactKindInput } from '@case-clinical/api/contact-kind/data-access'
import { AdminUpdateContactInput } from './dto/admin-update-contact.input'

@Injectable()
export class ApiContactDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContacts(adminId: string, input?: AdminListContactInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contact.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contactKind: true}
    })
  }

  async adminCountContacts(adminId: string, input?: AdminListContactInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contact.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminContact(adminId: string, contactId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contact.findUnique({ where: { id: contactId } , include: {contactKind: true, emails: true, phoneNumbers: true, contactSettings: true, tags: true, implants: true} })
  }

  async checkContactExist(contactName: string) {
    try {
      return this.data.contact.findMany({ where: { name: contactName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContact(adminId: string, input: AdminCreateContactInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactData = await this.checkContactExist(input.name)

      if (contactData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contact.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContact(adminId: string, contactId, input: AdminUpdateContactInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contact.update({
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
  }

  async adminDeleteContact(adminId: string, contactId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contact.delete({ where: { id: contactId } })
  }
}

