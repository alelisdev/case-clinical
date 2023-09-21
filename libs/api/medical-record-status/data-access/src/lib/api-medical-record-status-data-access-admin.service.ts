
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateMedicalRecordStatusInput } from './dto/admin-create-medical-record-status.input'
import { AdminListMedicalRecordStatusInput } from './dto/admin-list-medical-record-status.input'

import { AdminUpdateMedicalRecordStatusInput } from './dto/admin-update-medical-record-status.input'

@Injectable()
export class ApiMedicalRecordStatusDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMedicalRecordStatuses(adminId: string, input?: AdminListMedicalRecordStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.medicalRecordStatus.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountMedicalRecordStatuses(adminId: string, input?: AdminListMedicalRecordStatusInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalRecordStatus.count(
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

  
  

  async adminMedicalRecordStatus(adminId: string, medicalRecordStatusId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.medicalRecordStatus.findUnique({ where: { id: medicalRecordStatusId } , include: {appointments: true} })
  }

  async checkMedicalRecordStatusExist(medicalRecordStatusName: string) {
    try {
      return this.data.medicalRecordStatus.findMany({ where: { name: medicalRecordStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateMedicalRecordStatus(adminId: string, input: AdminCreateMedicalRecordStatusInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const medicalRecordStatusData = await this.checkMedicalRecordStatusExist(input.name)

      if (medicalRecordStatusData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.medicalRecordStatus.create({
          data: { 
    name: input.name, 

    }
    , include: {appointments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateMedicalRecordStatus(adminId: string, medicalRecordStatusId, input: AdminUpdateMedicalRecordStatusInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalRecordStatus.update({
      where: { id: medicalRecordStatusId },
      data: {
name: input.name, 

}
, include: {appointments: true} 
    })
  }

  async adminDeleteMedicalRecordStatus(adminId: string, medicalRecordStatusId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalRecordStatus.delete({ where: { id: medicalRecordStatusId } })
  }
}

