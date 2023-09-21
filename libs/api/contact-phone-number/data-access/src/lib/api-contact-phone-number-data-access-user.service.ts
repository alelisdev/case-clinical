
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactPhoneNumberInput } from './dto/user-create-contact-phone-number.input'
import { UserListContactPhoneNumberInput } from './dto/user-list-contact-phone-number.input'
import { UserUpdateContactPhoneNumberInput } from './dto/user-update-contact-phone-number.input'
import { UserUpdateContactPhoneNumbersInput } from './dto/user-update-contact-phone-numbers.input'

import { UserListCountryInput } from '@case-clinical/api/country/data-access'
import { UserListContactInput } from '@case-clinical/api/contact/data-access'

@Injectable()
export class ApiContactPhoneNumberDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContactPhoneNumbers(userId: string, input?: UserListContactPhoneNumberInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactPhoneNumber.findMany({
      where: {
            AND: [{
            name: { contains: name },
            countryId: input?.countryId,
contactId: input?.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {country: true, contact: true}
    })
  }

  async userSelectContactPhoneNumbers(userId: string, input?: UserListContactPhoneNumberInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactPhoneNumber.findMany({
      where: {
            AND: [{
            name: { contains: name },
            countryId: input?.countryId,
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

  async userCountContactPhoneNumbers(userId: string, input?: UserListContactPhoneNumberInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactPhoneNumber.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            countryId: input?.countryId,
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

  async userContactPhoneNumber(userId: string, contactPhoneNumberId) {

    return this.data.contactPhoneNumber.findUnique({ where: { id: contactPhoneNumberId } , include: {country: true, contact: true}  })
  }

  async checkContactPhoneNumberExist(contactPhoneNumberName: string) {
    try {
      return this.data.contactPhoneNumber.findMany({ where: { name: contactPhoneNumberName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContactPhoneNumber(userId: string, input: UserCreateContactPhoneNumberInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contactPhoneNumberData = await this.checkContactPhoneNumberExist(input.name)

        if (contactPhoneNumberData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContactPhoneNumber', 'Create', input)

    let contactPhoneNumber = await this.data.contactPhoneNumber.create({
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

    await this.data.logEvent(sendingUser, false, 'ContactPhoneNumber', 'Create', contactPhoneNumber)

    return contactPhoneNumber

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact Phone Number')
    }

  }


  
  

  async userUpdateContactPhoneNumber(userId: string, contactPhoneNumberId: string, input: UserUpdateContactPhoneNumberInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactPhoneNumberId) {
        throw new BadRequestException('Contact Phone Number Id is required')
      } else {

      const contactPhoneNumberData = await this.checkContactPhoneNumberExist(input.name)

      if (contactPhoneNumberData.length > 0) {
        if (contactPhoneNumberData[0].id != contactPhoneNumberId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContactPhoneNumber', 'Update', input)

    let contactPhoneNumber = this.data.contactPhoneNumber.update({
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

    await this.data.logEvent(sendingUser, false, 'ContactPhoneNumber', 'Update', contactPhoneNumber)

    return contactPhoneNumber

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact Phone Number')
    }
  }

  async userUpdateContactPhoneNumbers(userId: string, input: UserUpdateContactPhoneNumbersInput): Promise<UpdateResult> {
    const total = input.contactPhoneNumbers.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contactPhoneNumbers) {
      const inputData = input.contactPhoneNumbers[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
countryId: inputData.countryId, 
phoneNumber: inputData.phoneNumber, 
label: inputData.label, 
contactId: inputData.contactId, 

      }

      const contactPhoneNumberData = await this.checkContactPhoneNumberExist(inputData.name)

      if (contactPhoneNumberData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contactPhoneNumber.upsert({
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


  async userDeleteContactPhoneNumber(userId: string, contactPhoneNumberId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactPhoneNumberId) {
        throw new BadRequestException('Contact Phone Number Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ContactPhoneNumber', 'Delete', contactPhoneNumberId)

        let contactPhoneNumber = this.data.contactPhoneNumber.delete({
          where: { id: contactPhoneNumberId }
        })

        await this.data.logEvent(sendingUser, false, 'ContactPhoneNumber', 'Delete', contactPhoneNumber)

        return contactPhoneNumber

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact Phone Number')
    }
  }
}

