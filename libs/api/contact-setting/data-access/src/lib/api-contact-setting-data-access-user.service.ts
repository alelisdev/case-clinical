
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContactSettingInput } from './dto/user-create-contact-setting.input'
import { UserListContactSettingInput } from './dto/user-list-contact-setting.input'
import { UserUpdateContactSettingInput } from './dto/user-update-contact-setting.input'
import { UserUpdateContactSettingsInput } from './dto/user-update-contact-settings.input'

import { UserListContactInput } from '@case-clinical/api/contact/data-access'
import { UserListIntegrationInput } from '@case-clinical/api/integration/data-access'

@Injectable()
export class ApiContactSettingDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContactSettings(userId: string, input?: UserListContactSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactSetting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,
integrationId: input?.integrationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true, integration: true}
    })
  }

  async userSelectContactSettings(userId: string, input?: UserListContactSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactSetting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,
integrationId: input?.integrationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContactSettings(userId: string, input?: UserListContactSettingInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactSetting.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactId: input?.contactId,
integrationId: input?.integrationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContactSetting(userId: string, contactSettingId) {

    return this.data.contactSetting.findUnique({ where: { id: contactSettingId } , include: {contact: true, integration: true}  })
  }

  async checkContactSettingExist(contactSettingName: string) {
    try {
      return this.data.contactSetting.findMany({ where: { name: contactSettingName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContactSetting(userId: string, input: UserCreateContactSettingInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contactSettingData = await this.checkContactSettingExist(input.name)

        if (contactSettingData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'ContactSetting', 'Create', input)

    let contactSetting = await this.data.contactSetting.create({
      data: { 
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,  
                integration: 
                input.integrationId != null
                ? {
                        connect:  { 
                            id: input.integrationId
                        }
                    }: undefined,name: input.name, 
value: input.value, 
iconUrl: input.iconUrl, 
properties: input.properties, 

}
, include: {contact: true, integration: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactSetting', 'Create', contactSetting)

    return contactSetting

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contact Setting')
    }

  }


  
  

  async userUpdateContactSetting(userId: string, contactSettingId: string, input: UserUpdateContactSettingInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contactSettingId) {
        throw new BadRequestException('Contact Setting Id is required')
      } else {

      const contactSettingData = await this.checkContactSettingExist(input.name)

      if (contactSettingData.length > 0) {
        if (contactSettingData[0].id != contactSettingId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'ContactSetting', 'Update', input)

    let contactSetting = this.data.contactSetting.update({
      where: { id: contactSettingId },
      data: {
  
                contact: 
                input.contactId != null
                ? {
                        connect:  { 
                            id: input.contactId
                        }
                    }: undefined,  
                integration: 
                input.integrationId != null
                ? {
                        connect:  { 
                            id: input.integrationId
                        }
                    }: undefined,name: input.name, 
value: input.value, 
iconUrl: input.iconUrl, 
properties: input.properties, 

}
, include: {contact: true, integration: true} 
    })

    await this.data.logEvent(sendingUser, false, 'ContactSetting', 'Update', contactSetting)

    return contactSetting

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contact Setting')
    }
  }

  async userUpdateContactSettings(userId: string, input: UserUpdateContactSettingsInput): Promise<UpdateResult> {
    const total = input.contactSettings.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contactSettings) {
      const inputData = input.contactSettings[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
value: inputData.value, 
iconUrl: inputData.iconUrl, 
properties: inputData.properties, 
contactId: inputData.contactId, 
integrationId: inputData.integrationId, 

      }

      const contactSettingData = await this.checkContactSettingExist(inputData.name)

      if (contactSettingData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contactSetting.upsert({
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


  async userDeleteContactSetting(userId: string, contactSettingId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!contactSettingId) {
        throw new BadRequestException('Contact Setting Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'ContactSetting', 'Delete', contactSettingId)

        let contactSetting = this.data.contactSetting.delete({
          where: { id: contactSettingId }
        })

        await this.data.logEvent(sendingUser, false, 'ContactSetting', 'Delete', contactSetting)

        return contactSetting

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contact Setting')
    }
  }
}

