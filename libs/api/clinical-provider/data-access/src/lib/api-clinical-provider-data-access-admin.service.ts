
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderInput } from './dto/admin-create-clinical-provider.input'
import { AdminListClinicalProviderInput } from './dto/admin-list-clinical-provider.input'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminUpdateClinicalProviderInput } from './dto/admin-update-clinical-provider.input'

@Injectable()
export class ApiClinicalProviderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviders(adminId: string, input?: AdminListClinicalProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProvider.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {vendor: true}
    })
  }

  async adminCountClinicalProviders(adminId: string, input?: AdminListClinicalProviderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProvider.count(
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

  
  

  async adminClinicalProvider(adminId: string, clinicalProviderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProvider.findUnique({ where: { id: clinicalProviderId } , include: {vendor: true, appointments: true, 
      clinicalProviderLocations: true, clinicalProviderSpecialties: true, clinicalProviderTags: true, 
      favoriteProviders: true, medicalConditionProviders: true, medicalRecords: true, pchProviders: true} })
  }

  async checkClinicalProviderExist(clinicalProviderName: string) {
    try {
      return this.data.clinicalProvider.findMany({ where: { name: clinicalProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProvider(adminId: string, input: AdminCreateClinicalProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderData = await this.checkClinicalProviderExist(input.name)

      if (clinicalProviderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProvider.create({
          data: { 
      
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
npi: input.npi, 
honorific: input.honorific, 
firstName: input.firstName, 
lastName: input.lastName, 
suffix: input.suffix, 
phoneNumber: input.phoneNumber, 
emailAddress: input.emailAddress, 
    }
    , include: {vendor: true, appointments: true, clinicalProviderLocations: true, clinicalProviderSpecialties: true, clinicalProviderTags: true, favoriteProviders: true, medicalConditionProviders: true, medicalRecords: true, pchProviders: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProvider(adminId: string, clinicalProviderId, input: AdminUpdateClinicalProviderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProvider.update({
      where: { id: clinicalProviderId },
      data: {
  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,name: input.name, 
npi: input.npi, 
honorific: input.honorific, 
firstName: input.firstName, 
lastName: input.lastName, 
suffix: input.suffix, 
phoneNumber: input.phoneNumber, 
emailAddress: input.emailAddress, 

}
, include: {vendor: true, appointments: true, clinicalProviderLocations: true, clinicalProviderSpecialties: true, clinicalProviderTags: true, favoriteProviders: true, medicalConditionProviders: true, medicalRecords: true, pchProviders: true} 
    })
  }

  async adminDeleteClinicalProvider(adminId: string, clinicalProviderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProvider.delete({ where: { id: clinicalProviderId } })
  }
}

