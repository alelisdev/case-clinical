
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateMedicalConditionProviderInput } from './dto/admin-create-medical-condition-provider.input'
import { AdminListMedicalConditionProviderInput } from './dto/admin-list-medical-condition-provider.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateMedicalConditionProviderInput } from './dto/admin-update-medical-condition-provider.input'

@Injectable()
export class ApiMedicalConditionProviderDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMedicalConditionProviders(adminId: string, input?: AdminListMedicalConditionProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.medicalConditionProvider.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountMedicalConditionProviders(adminId: string, input?: AdminListMedicalConditionProviderInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalConditionProvider.count(
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

  
  

  async adminMedicalConditionProvider(adminId: string, medicalConditionProviderId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.medicalConditionProvider.findUnique({ where: { id: medicalConditionProviderId } , include: {clinicalProvider: true, medicalRecords: true} })
  }

  async checkMedicalConditionProviderExist(medicalConditionProviderName: string) {
    try {
      return this.data.medicalConditionProvider.findMany({ where: { name: medicalConditionProviderName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateMedicalConditionProvider(adminId: string, input: AdminCreateMedicalConditionProviderInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const medicalConditionProviderData = await this.checkMedicalConditionProviderExist(input.name)

      if (medicalConditionProviderData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.medicalConditionProvider.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {clinicalProvider: true, medicalRecords: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateMedicalConditionProvider(adminId: string, medicalConditionProviderId, input: AdminUpdateMedicalConditionProviderInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalConditionProvider.update({
      where: { id: medicalConditionProviderId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 

}
, include: {clinicalProvider: true, medicalRecords: true} 
    })
  }

  async adminDeleteMedicalConditionProvider(adminId: string, medicalConditionProviderId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalConditionProvider.delete({ where: { id: medicalConditionProviderId } })
  }
}

