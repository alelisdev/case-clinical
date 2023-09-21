
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePchProviderInput } from './dto/user-create-pch-provider.input'
import { UserListPchProviderInput } from './dto/user-list-pch-provider.input'
import { UserUpdatePchProviderInput } from './dto/user-update-pch-provider.input'
import { UserUpdatePchProvidersInput } from './dto/user-update-pch-providers.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiPchProviderDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPchProviders(userId: string, input?: UserListPchProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.pchProvider.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async userSelectPchProviders(userId: string, input?: UserListPchProviderInput) {
    let name = input?.name ? input.name : undefined

    return this.data.pchProvider.findMany({
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

  async userCountPchProviders(userId: string, input?: UserListPchProviderInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.pchProvider.count(
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

  async userPchProvider(userId: string, pchProviderId) {

    return this.data.pchProvider.findUnique({ where: { id: pchProviderId } , include: {clinicalProvider: true}  })
  }

  async checkPchProviderExist(pchProviderName: string) {
    try {
      return this.data.pchProvider.findMany({ where: { name: pchProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePchProvider(userId: string, input: UserCreatePchProviderInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const pchProviderData = await this.checkPchProviderExist(input.name)

        if (pchProviderData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PchProvider', 'Create', input)

    let pchProvider = await this.data.pchProvider.create({
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

    await this.data.logEvent(sendingUser, false, 'PchProvider', 'Create', pchProvider)

    return pchProvider

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Pch Provider')
    }

  }


  
  

  async userUpdatePchProvider(userId: string, pchProviderId: string, input: UserUpdatePchProviderInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!pchProviderId) {
        throw new BadRequestException('Pch Provider Id is required')
      } else {

      const pchProviderData = await this.checkPchProviderExist(input.name)

      if (pchProviderData.length > 0) {
        if (pchProviderData[0].id != pchProviderId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PchProvider', 'Update', input)

    let pchProvider = this.data.pchProvider.update({
      where: { id: pchProviderId },
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

    await this.data.logEvent(sendingUser, false, 'PchProvider', 'Update', pchProvider)

    return pchProvider

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Pch Provider')
    }
  }

  async userUpdatePchProviders(userId: string, input: UserUpdatePchProvidersInput): Promise<UpdateResult> {
    const total = input.pchProviders.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.pchProviders) {
      const inputData = input.pchProviders[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
clinicalProviderId: inputData.clinicalProviderId, 

      }

      const pchProviderData = await this.checkPchProviderExist(inputData.name)

      if (pchProviderData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.pchProvider.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeletePchProvider(userId: string, pchProviderId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!pchProviderId) {
        throw new BadRequestException('Pch Provider Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'PchProvider', 'Delete', pchProviderId)

        let pchProvider = this.data.pchProvider.delete({
          where: { id: pchProviderId }
        })

        await this.data.logEvent(sendingUser, false, 'PchProvider', 'Delete', pchProvider)

        return pchProvider

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Pch Provider')
    }
  }
}

