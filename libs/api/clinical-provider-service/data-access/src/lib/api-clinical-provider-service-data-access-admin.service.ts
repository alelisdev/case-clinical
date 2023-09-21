
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderServiceInput } from './dto/admin-create-clinical-provider-service.input'
import { AdminListClinicalProviderServiceInput } from './dto/admin-list-clinical-provider-service.input'
import { AdminListServiceInput } from '@case-clinical/api/service/data-access'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateClinicalProviderServiceInput } from './dto/admin-update-clinical-provider-service.input'

@Injectable()
export class ApiClinicalProviderServiceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviderServices(adminId: string, input?: AdminListClinicalProviderServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderService.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {service: true, clinicalProvider: true}
    })
  }

  async adminCountClinicalProviderServices(adminId: string, input?: AdminListClinicalProviderServiceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderService.count(
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

  
  

  async adminClinicalProviderService(adminId: string, clinicalProviderServiceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProviderService.findUnique({ where: { id: clinicalProviderServiceId } , include: {service: true, clinicalProvider: true} })
  }

  async checkClinicalProviderServiceExist(clinicalProviderServiceName: string) {
    try {
      return this.data.clinicalProviderService.findMany({ where: { name: clinicalProviderServiceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProviderService(adminId: string, input: AdminCreateClinicalProviderServiceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderServiceData = await this.checkClinicalProviderServiceExist(input.name)

      if (clinicalProviderServiceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProviderService.create({
          data: { 
      
                service: 
                input.serviceId != null
                ? {
                        connect:  { 
                            id: input.serviceId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {service: true, clinicalProvider: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProviderService(adminId: string, clinicalProviderServiceId, input: AdminUpdateClinicalProviderServiceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderService.update({
      where: { id: clinicalProviderServiceId },
      data: {
  
                service: 
                input.serviceId != null
                ? {
                        connect:  { 
                            id: input.serviceId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {service: true, clinicalProvider: true} 
    })
  }

  async adminDeleteClinicalProviderService(adminId: string, clinicalProviderServiceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderService.delete({ where: { id: clinicalProviderServiceId } })
  }
}

