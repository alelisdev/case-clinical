
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateFavoriteProviderInput } from './dto/admin-create-favorite-provider.input'
import { AdminListFavoriteProviderInput } from './dto/admin-list-favorite-provider.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateFavoriteProviderInput } from './dto/admin-update-favorite-provider.input'

@Injectable()
export class ApiFavoriteProviderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminFavoriteProviders(adminId: string, input?: AdminListFavoriteProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.favoriteProvider.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountFavoriteProviders(adminId: string, input?: AdminListFavoriteProviderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.favoriteProvider.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminFavoriteProvider(adminId: string, favoriteProviderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.favoriteProvider.findUnique({ where: { id: favoriteProviderId } , include: {clinicalProvider: true} })
  }

  async checkFavoriteProviderExist(favoriteProviderName: string) {
    try {
      return this.data.favoriteProvider.findMany({ where: { name: favoriteProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateFavoriteProvider(adminId: string, input: AdminCreateFavoriteProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const favoriteProviderData = await this.checkFavoriteProviderExist(input.name)

      if (favoriteProviderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.favoriteProvider.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {clinicalProvider: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateFavoriteProvider(adminId: string, favoriteProviderId, input: AdminUpdateFavoriteProviderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.favoriteProvider.update({
      where: { id: favoriteProviderId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true} 
    })
  }

  async adminDeleteFavoriteProvider(adminId: string, favoriteProviderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.favoriteProvider.delete({ where: { id: favoriteProviderId } })
  }
}

