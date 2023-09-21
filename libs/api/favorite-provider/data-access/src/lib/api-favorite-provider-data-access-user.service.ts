
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateFavoriteProviderInput } from './dto/user-create-favorite-provider.input'
import { UserListFavoriteProviderInput } from './dto/user-list-favorite-provider.input'
import { UserUpdateFavoriteProviderInput } from './dto/user-update-favorite-provider.input'
import { UserUpdateFavoriteProvidersInput } from './dto/user-update-favorite-providers.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiFavoriteProviderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userFavoriteProviders(userId: string, input?: UserListFavoriteProviderInput) {
    let name = input?.name ? input.name : undefined
    const user = await this.data.user.findUnique({ where: { id: userId } });

    return this.data.favoriteProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            userId: user.patientId ? userId : undefined,
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, specialty:true, user:true}
    })
  }

  async userSelectFavoriteProviders(userId: string, input?: UserListFavoriteProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.favoriteProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountFavoriteProviders(userId: string, input?: UserListFavoriteProviderInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.favoriteProvider.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userFavoriteProvider(userId: string, favoriteProviderId) {

    return this.data.favoriteProvider.findUnique({ where: { id: favoriteProviderId } , include: {clinicalProvider: true, specialty:true}  })
  }

  async checkFavoriteProviderExist(favoriteProviderName: string) {
    try {
      return this.data.favoriteProvider.findMany({ where: { name: favoriteProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateFavoriteProvider(userId: string, input: UserCreateFavoriteProviderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    if(!input.name)
      input.name = `${sendingUser.id}_${input.clinicalProviderId}`;

    if(sendingUser.patientId)
      input.userId = userId;

    const existingFavoriteProvider = await this.data.favoriteProvider.findFirst({
      where: {
        clinicalProviderId: input.clinicalProviderId,
        userId: input.userId
      }
    })

    if(existingFavoriteProvider) throw new BadRequestException('Cannot add duplicate favorite provier record with the current clinicalProvider and user');

    try {
        const favoriteProviderData = await this.checkFavoriteProviderExist(input.name)

        if (favoriteProviderData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'FavoriteProvider', 'Create', input)

    let favoriteProvider = await this.data.favoriteProvider.create({
      data: {

                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,
                specialty:
                input.specialtyId != null
                    ? {
                            connect:  {
                                id: input.specialtyId
                            }
                        }: undefined,
                user:
                input.userId != null
                    ? {
                            connect:  {
                                id: input.userId
                            }
                        }: undefined,name: input.name,
                //userId:input.userId

}
, include: {clinicalProvider: true}
    })

    await this.data.logEvent(sendingUser, false, 'FavoriteProvider', 'Create', favoriteProvider)

    return favoriteProvider

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Favorite Provider')
    }

  }





  async userUpdateFavoriteProvider(userId: string, favoriteProviderId: string, input: UserUpdateFavoriteProviderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!favoriteProviderId) {
        throw new BadRequestException('Favorite Provider Id is required')
      } else {

      const favoriteProviderData = await this.checkFavoriteProviderExist(input.name)

      if (favoriteProviderData.length > 0) {
        if (favoriteProviderData[0].id != favoriteProviderId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'FavoriteProvider', 'Update', input)

    let favoriteProvider = this.data.favoriteProvider.update({
      where: { id: favoriteProviderId },
      data: {

                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,
                specialty:
                input.specialtyId != null
                    ? {
                            connect:  {
                                id: input.specialtyId
                            }
                        }: undefined,
                user:
                input.userId != null
                    ? {
                            connect:  {
                                id: input.userId
                            }
                        }: undefined,
                        name: input.name,

}
, include: {clinicalProvider: true}
    })

    await this.data.logEvent(sendingUser, false, 'FavoriteProvider', 'Update', favoriteProvider)

    return favoriteProvider

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Favorite Provider')
    }
  }

  async userUpdateFavoriteProviders(userId: string, input: UserUpdateFavoriteProvidersInput): Promise<UpdateResult> {
    const total = input.favoriteProviders.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.favoriteProviders) {
      const inputData = input.favoriteProviders[key]

        const data =  {
            id: inputData.id,
name: inputData.name,
clinicalProviderId: inputData.clinicalProviderId,
userId: inputData.userId,
specialtyId: inputData.specialtyId,
      }

      const favoriteProviderData = await this.checkFavoriteProviderExist(inputData.name)

      if (favoriteProviderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
            const result = await this.data.favoriteProvider.upsert({
            where: {id: inputData.id || ""},
              create: data,
              update: data
            })

            if(result.id === inputData.id)
              updated.push(result);
            else {
              created.push(result);
            }
          } catch (error) {
              failed.push(inputData);
          }
      }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }
  }

  async userDeleteFavoriteProvider(userId: string, favoriteProviderId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!favoriteProviderId) {
        throw new BadRequestException('Favorite Provider Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'FavoriteProvider', 'Delete', favoriteProviderId)

        let favoriteProvider = this.data.favoriteProvider.delete({
          where: { id: favoriteProviderId }
        })

        await this.data.logEvent(sendingUser, false, 'FavoriteProvider', 'Delete', favoriteProvider)

        return favoriteProvider

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Favorite Provider')
    }
  }
}

