
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListIntegrationInput } from './dto/user-list-integration.input'

@Injectable()
export class ApiIntegrationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicIntegrations(input?: UserListIntegrationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.integration.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectIntegrations(input?: UserListIntegrationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.integration.findMany({
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

  async publicCountIntegrations(input?: UserListIntegrationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.integration.count(
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

  async publicIntegration(integrationId) {

    return this.data.integration.findUnique({ where: { id: integrationId } , include: {contactSettings: true}  })
  }
}


