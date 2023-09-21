
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListFavoriteProviderInput } from './dto/user-list-favorite-provider.input'

@Injectable()
export class ApiFavoriteProviderDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicFavoriteProviders(input?: UserListFavoriteProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.favoriteProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectFavoriteProviders(input?: UserListFavoriteProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.favoriteProvider.findMany({
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

  async publicCountFavoriteProviders(input?: UserListFavoriteProviderInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.favoriteProvider.count(
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

  async publicFavoriteProvider(favoriteProviderId) {

    return this.data.favoriteProvider.findUnique({ where: { id: favoriteProviderId } , include: {clinicalProvider: true}  })
  }
}


