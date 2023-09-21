
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContactPhoneNumberInput } from './dto/user-list-contact-phone-number.input'

@Injectable()
export class ApiContactPhoneNumberDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContactPhoneNumbers(input?: UserListContactPhoneNumberInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactPhoneNumber.findMany({
      where: {
            AND: [{
            name: { contains: name },
            countryId: input.countryId,
contactId: input.contactId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {country: true, contact: true}
    })
  }

  async publicSelectContactPhoneNumbers(input?: UserListContactPhoneNumberInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contactPhoneNumber.findMany({
      where: {
            AND: [{
            name: { contains: name },
            countryId: input.countryId,
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

  async publicCountContactPhoneNumbers(input?: UserListContactPhoneNumberInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contactPhoneNumber.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            countryId: input.countryId,
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

  async publicContactPhoneNumber(contactPhoneNumberId) {

    return this.data.contactPhoneNumber.findUnique({ where: { id: contactPhoneNumberId } , include: {country: true, contact: true}  })
  }
}


