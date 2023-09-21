
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCountryInput } from './dto/user-list-country.input'

@Injectable()
export class ApiCountryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCountries(input?: UserListCountryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.country.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectCountries(input?: UserListCountryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.country.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCountries(input?: UserListCountryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.country.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCountry(countryId) {

    return this.data.country.findUnique({ where: { id: countryId } , include: {contactPhoneNumbers: true}  })
  }
}


