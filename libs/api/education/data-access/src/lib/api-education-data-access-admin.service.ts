
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateEducationInput } from './dto/admin-create-education.input'
import { AdminListEducationInput } from './dto/admin-list-education.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateEducationInput } from './dto/admin-update-education.input'

@Injectable()
export class ApiEducationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminEducations(adminId: string, input?: AdminListEducationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.education.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountEducations(adminId: string, input?: AdminListEducationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.education.count(
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

  
  

  async adminEducation(adminId: string, educationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.education.findUnique({ where: { id: educationId } , include: {clinicalProvider: true} })
  }

  async checkEducationExist(educationName: string) {
    try {
      return this.data.education.findMany({ where: { name: educationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateEducation(adminId: string, input: AdminCreateEducationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const educationData = await this.checkEducationExist(input.name)

      if (educationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.education.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
degree: input.degree, 
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

  async adminUpdateEducation(adminId: string, educationId, input: AdminUpdateEducationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.education.update({
      where: { id: educationId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
school: input.school, 
degree: input.degree, 
from: input.from, 
to: input.to, 

}
, include: {clinicalProvider: true} 
    })
  }

  async adminDeleteEducation(adminId: string, educationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.education.delete({ where: { id: educationId } })
  }
}

