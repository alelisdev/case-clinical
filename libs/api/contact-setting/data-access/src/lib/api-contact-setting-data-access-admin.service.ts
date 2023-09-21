
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContactSettingInput } from './dto/admin-create-contact-setting.input'
import { AdminListContactSettingInput } from './dto/admin-list-contact-setting.input'
import { AdminListContactInput } from '@case-clinical/api/contact/data-access'
import { AdminListIntegrationInput } from '@case-clinical/api/integration/data-access'
import { AdminUpdateContactSettingInput } from './dto/admin-update-contact-setting.input'

@Injectable()
export class ApiContactSettingDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContactSettings(adminId: string, input?: AdminListContactSettingInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contactSetting.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true, integration: true}
    })
  }

  async adminCountContactSettings(adminId: string, input?: AdminListContactSettingInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contactSetting.count(
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

  
  

  async adminContactSetting(adminId: string, contactSettingId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contactSetting.findUnique({ where: { id: contactSettingId } , include: {contact: true, integration: true} })
  }

  async checkContactSettingExist(contactSettingName: string) {
    try {
      return this.data.contactSetting.findMany({ where: { name: contactSettingName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContactSetting(adminId: string, input: AdminCreateContactSettingInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contactSettingData = await this.checkContactSettingExist(input.name)

      if (contactSettingData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contactSetting.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContactSetting(adminId: string, contactSettingId, input: AdminUpdateContactSettingInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactSetting.update({
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
  }

  async adminDeleteContactSetting(adminId: string, contactSettingId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contactSetting.delete({ where: { id: contactSettingId } })
  }
}

