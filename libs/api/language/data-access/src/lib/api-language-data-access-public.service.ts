
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLanguageInput } from './dto/user-list-language.input'

@Injectable()
export class ApiLanguageDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLanguages(input?: UserListLanguageInput) {
    let name = input?.name ? input.name : undefined

    return this.data.language.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectLanguages(input?: UserListLanguageInput) {
    let name = input?.name ? input.name : undefined

    return this.data.language.findMany({
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

  async publicCountLanguages(input?: UserListLanguageInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.language.count(
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

  async publicLanguage(languageId) {

    return this.data.language.findUnique({ where: { id: languageId } , include: {patients: true}  })
  }
}


