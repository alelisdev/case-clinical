
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactEmailInput } from './dto/user-list-contact-email.input'

@Injectable()
export class ApiContactEmailDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContactEmails(input?: UserListContactEmailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactEmail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async publicSelectContactEmails(input?: UserListContactEmailInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactEmail.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContactEmails(input?: UserListContactEmailInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contactEmail.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContactEmail(contactEmailId) {

    return this.data.contactEmail.findUnique({ where: { id: contactEmailId } , include: {contact: true}  })
  }
}


