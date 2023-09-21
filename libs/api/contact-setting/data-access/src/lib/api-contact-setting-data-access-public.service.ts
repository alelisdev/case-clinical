
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactSettingInput } from './dto/user-list-contact-setting.input'

@Injectable()
export class ApiContactSettingDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContactSettings(input?: UserListContactSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactSetting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,
integrationId: input.integrationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true, integration: true}
    })
  }

  async publicSelectContactSettings(input?: UserListContactSettingInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactSetting.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,
integrationId: input.integrationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContactSettings(input?: UserListContactSettingInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contactSetting.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,
integrationId: input.integrationId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContactSetting(contactSettingId) {

    return this.data.contactSetting.findUnique({ where: { id: contactSettingId } , include: {contact: true, integration: true}  })
  }
}


