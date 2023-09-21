
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateExperienceInput } from './dto/admin-create-experience.input'
import { AdminListExperienceInput } from './dto/admin-list-experience.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateExperienceInput } from './dto/admin-update-experience.input'

@Injectable()
export class ApiExperienceDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminExperiences(adminId: string, input?: AdminListExperienceInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.experience.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountExperiences(adminId: string, input?: AdminListExperienceInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.experience.count(
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

  
  

  async adminExperience(adminId: string, experienceId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.experience.findUnique({ where: { id: experienceId } , include: {clinicalProvider: true} })
  }

  async checkExperienceExist(experienceName: string) {
    try {
      return this.data.experience.findMany({ where: { name: experienceName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateExperience(adminId: string, input: AdminCreateExperienceInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const experienceData = await this.checkExperienceExist(input.name)

      if (experienceData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.experience.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,createdAt: input.createdAt, 
updatedAt: input.updatedAt, 
name: input.name, 
workplace: input.workplace, 
from: input.from, 
to: input.to, 

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

  async adminUpdateExperience(adminId: string, experienceId, input: AdminUpdateExperienceInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.experience.update({
      where: { id: experienceId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,createdAt: input.createdAt, 
updatedAt: input.updatedAt, 
name: input.name, 
workplace: input.workplace, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })
  }

  async adminDeleteExperience(adminId: string, experienceId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.experience.delete({ where: { id: experienceId } })
  }
}

