
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePatientTreatmentStatusInput } from './dto/admin-create-patient-treatment-status.input'
import { AdminListPatientTreatmentStatusInput } from './dto/admin-list-patient-treatment-status.input'

import { AdminUpdatePatientTreatmentStatusInput } from './dto/admin-update-patient-treatment-status.input'

@Injectable()
export class ApiPatientTreatmentStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPatientTreatmentStatuses(adminId: string, input?: AdminListPatientTreatmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.patientTreatmentStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountPatientTreatmentStatuses(adminId: string, input?: AdminListPatientTreatmentStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.patientTreatmentStatus.count(
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

  
  

  async adminPatientTreatmentStatus(adminId: string, patientTreatmentStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.patientTreatmentStatus.findUnique({ where: { id: patientTreatmentStatusId } , include: {legalCases: true} })
  }

  async checkPatientTreatmentStatusExist(patientTreatmentStatusName: string) {
    try {
      return this.data.patientTreatmentStatus.findMany({ where: { name: patientTreatmentStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePatientTreatmentStatus(adminId: string, input: AdminCreatePatientTreatmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const patientTreatmentStatusData = await this.checkPatientTreatmentStatusExist(input.name)

      if (patientTreatmentStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.patientTreatmentStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {legalCases: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePatientTreatmentStatus(adminId: string, patientTreatmentStatusId, input: AdminUpdatePatientTreatmentStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patientTreatmentStatus.update({
      where: { id: patientTreatmentStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })
  }

  async adminDeletePatientTreatmentStatus(adminId: string, patientTreatmentStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patientTreatmentStatus.delete({ where: { id: patientTreatmentStatusId } })
  }
}

