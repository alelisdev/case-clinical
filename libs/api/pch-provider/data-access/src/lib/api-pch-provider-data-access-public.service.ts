
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPchProviderInput } from './dto/user-list-pch-provider.input'

@Injectable()
export class ApiPchProviderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPchProviders(input?: UserListPchProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.pchProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectPchProviders(input?: UserListPchProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.pchProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPchProviders(input?: UserListPchProviderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.pchProvider.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPchProvider(pchProviderId) {

    return this.data.pchProvider.findUnique({ where: { id: pchProviderId } , include: {clinicalProvider: true}  })
  }
}


