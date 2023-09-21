
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactPhoneNumberInput } from './dto/admin-create-contact-phone-number.input'
import { AdminListContactPhoneNumberInput } from './dto/admin-list-contact-phone-number.input'
import { AdminListCountryInput } from '@case-clinical/api/country/data-access'
import { AdminListContactInput } from '@case-clinical/api/contact/data-access'
import { AdminUpdateContactPhoneNumberInput } from './dto/admin-update-contact-phone-number.input'

@Injectable()
export class ApiContactPhoneNumberDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContactPhoneNumbers(adminId: string, input?: AdminListContactPhoneNumberInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contactPhoneNumber.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {country: true, contact: true}
    })
  }

  async adminCountContactPhoneNumbers(adminId: string, input?: AdminListContactPhoneNumberInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactPhoneNumber.count(
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

  
  

  async adminContactPhoneNumber(adminId: string, contactPhoneNumberId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contactPhoneNumber.findUnique({ where: { id: contactPhoneNumberId } , include: {country: true, contact: true} })
  }

  async checkContactPhoneNumberExist(contactPhoneNumberName: string) {
    try {
      return this.data.contactPhoneNumber.findMany({ where: { name: contactPhoneNumberName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContactPhoneNumber(adminId: string, input: AdminCreateContactPhoneNumberInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactPhoneNumberData = await this.checkContactPhoneNumberExist(input.name)

      if (contactPhoneNumberData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contactPhoneNumber.create({
          data: { 
      
                country: 
                input.countryId != null
                ? {
                        connect:  { 
                            id: input.countryId
                        }
                    }: undefined,  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 
phoneNumber: input.phoneNumber, 
label: input.label, 

    }
    , include: {country: true, contact: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContactPhoneNumber(adminId: string, contactPhoneNumberId, input: AdminUpdateContactPhoneNumberInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactPhoneNumber.update({
      where: { id: contactPhoneNumberId },
      data: {
  
                country: 
                input.countryId != null
                ? {
                        connect:  { 
                            id: input.countryId
                        }
                    }: undefined,  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,name: input.name, 
phoneNumber: input.phoneNumber, 
label: input.label, 

}
, include: {country: true, contact: true} 
    })
  }

  async adminDeleteContactPhoneNumber(adminId: string, contactPhoneNumberId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactPhoneNumber.delete({ where: { id: contactPhoneNumberId } })
  }
}

