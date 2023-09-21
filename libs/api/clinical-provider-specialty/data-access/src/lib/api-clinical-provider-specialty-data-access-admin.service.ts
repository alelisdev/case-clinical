
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateClinicalProviderSpecialtyInput } from './dto/admin-create-clinical-provider-specialty.input'
import { AdminListClinicalProviderSpecialtyInput } from './dto/admin-list-clinical-provider-specialty.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { AdminUpdateClinicalProviderSpecialtyInput } from './dto/admin-update-clinical-provider-specialty.input'

@Injectable()
export class ApiClinicalProviderSpecialtyDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminClinicalProviderSpecialties(adminId: string, input?: AdminListClinicalProviderSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.clinicalProviderSpecialty.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, specialty: true}
    })
  }

  async adminCountClinicalProviderSpecialties(adminId: string, input?: AdminListClinicalProviderSpecialtyInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.clinicalProviderSpecialty.count(
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

  
  

  async adminClinicalProviderSpecialty(adminId: string, clinicalProviderSpecialtyId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.clinicalProviderSpecialty.findUnique({ where: { id: clinicalProviderSpecialtyId } , include: {clinicalProvider: true, specialty: true} })
  }

  async checkClinicalProviderSpecialtyExist(clinicalProviderSpecialtyName: string) {
    try {
      return this.data.clinicalProviderSpecialty.findMany({ where: { name: clinicalProviderSpecialtyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateClinicalProviderSpecialty(adminId: string, input: AdminCreateClinicalProviderSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const clinicalProviderSpecialtyData = await this.checkClinicalProviderSpecialtyExist(input.name)

      if (clinicalProviderSpecialtyData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.clinicalProviderSpecialty.create({
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
                    }: undefined,name: input.name, 
npi: input.npi, 

    }
    , include: {clinicalProvider: true, specialty: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateClinicalProviderSpecialty(adminId: string, clinicalProviderSpecialtyId, input: AdminUpdateClinicalProviderSpecialtyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderSpecialty.update({
      where: { id: clinicalProviderSpecialtyId },
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
                    }: undefined,name: input.name, 
npi: input.npi, 

}
, include: {clinicalProvider: true, specialty: true} 
    })
  }

  async adminDeleteClinicalProviderSpecialty(adminId: string, clinicalProviderSpecialtyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.clinicalProviderSpecialty.delete({ where: { id: clinicalProviderSpecialtyId } })
  }
}

