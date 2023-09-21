
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePchProviderInput } from './dto/admin-create-pch-provider.input'
import { AdminListPchProviderInput } from './dto/admin-list-pch-provider.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdatePchProviderInput } from './dto/admin-update-pch-provider.input'

@Injectable()
export class ApiPchProviderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPchProviders(adminId: string, input?: AdminListPchProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.pchProvider.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountPchProviders(adminId: string, input?: AdminListPchProviderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.pchProvider.count(
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

  
  

  async adminPchProvider(adminId: string, pchProviderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.pchProvider.findUnique({ where: { id: pchProviderId } , include: {clinicalProvider: true} })
  }

  async checkPchProviderExist(pchProviderName: string) {
    try {
      return this.data.pchProvider.findMany({ where: { name: pchProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePchProvider(adminId: string, input: AdminCreatePchProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const pchProviderData = await this.checkPchProviderExist(input.name)

      if (pchProviderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.pchProvider.create({
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

  async adminUpdatePchProvider(adminId: string, pchProviderId, input: AdminUpdatePchProviderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.pchProvider.update({
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
  }

  async adminDeletePchProvider(adminId: string, pchProviderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.pchProvider.delete({ where: { id: pchProviderId } })
  }
}

