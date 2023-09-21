
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactInput } from './dto/user-list-contact.input'

@Injectable()
export class ApiContactDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContacts(input?: UserListContactInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contact.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input.contactKindId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contactKind: true}
    })
  }

  async publicSelectContacts(input?: UserListContactInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contact.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input.contactKindId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContacts(input?: UserListContactInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contact.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactKindId: input.contactKindId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContact(contactId) {

    return this.data.contact.findUnique({ where: { id: contactId } , include: {contactKind: true, emails: true, phoneNumbers: true, contactSettings: true, tags: true, implants: true}  })
  }
}


