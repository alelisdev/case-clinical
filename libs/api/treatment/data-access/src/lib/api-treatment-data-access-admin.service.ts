
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateTreatmentInput } from './dto/admin-create-treatment.input'
import { AdminListTreatmentInput } from './dto/admin-list-treatment.input'

import { AdminUpdateTreatmentInput } from './dto/admin-update-treatment.input'

@Injectable()
export class ApiTreatmentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTreatments(adminId: string, input?: AdminListTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.treatment.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountTreatments(adminId: string, input?: AdminListTreatmentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.treatment.count(
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

  
  

  async adminTreatment(adminId: string, treatmentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.treatment.findUnique({ where: { id: treatmentId } , include: {leads: true} })
  }

  async checkTreatmentExist(treatmentName: string) {
    try {
      return this.data.treatment.findMany({ where: { name: treatmentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateTreatment(adminId: string, input: AdminCreateTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const treatmentData = await this.checkTreatmentExist(input.name)

      if (treatmentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.treatment.create({
          data: { 
    name: input.name, 

    }
    , include: {leads: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateTreatment(adminId: string, treatmentId, input: AdminUpdateTreatmentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.treatment.update({
      where: { id: treatmentId },
      data: {
name: input.name, 

}
, include: {leads: true} 
    })
  }

  async adminDeleteTreatment(adminId: string, treatmentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.treatment.delete({ where: { id: treatmentId } })
  }
}

