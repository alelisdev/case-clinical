
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactTagInput } from './dto/user-list-contact-tag.input'

@Injectable()
export class ApiContactTagDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContactTags(input?: UserListContactTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactTag.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contactId: input.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contact: true}
    })
  }

  async publicSelectContactTags(input?: UserListContactTagInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactTag.findMany({
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

  async publicCountContactTags(input?: UserListContactTagInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contactTag.count(
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

  async publicContactTag(contactTagId) {

    return this.data.contactTag.findUnique({ where: { id: contactTagId } , include: {contact: true}  })
  }
}


