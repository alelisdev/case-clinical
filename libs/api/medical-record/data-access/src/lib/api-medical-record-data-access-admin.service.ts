
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateMedicalRecordInput } from './dto/admin-create-medical-record.input'
import { AdminListMedicalRecordInput } from './dto/admin-list-medical-record.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateMedicalRecordInput } from './dto/admin-update-medical-record.input'

@Injectable()
export class ApiMedicalRecordDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminMedicalRecords(adminId: string, input?: AdminListMedicalRecordInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.medicalRecord.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountMedicalRecords(adminId: string, input?: AdminListMedicalRecordInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalRecord.count(
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

  
  

  async adminMedicalRecord(adminId: string, medicalRecordId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.medicalRecord.findUnique({ where: { id: medicalRecordId } , include: {clinicalProvider: true} })
  }

  async checkMedicalRecordExist(medicalRecordName: string) {
    try {
      return this.data.medicalRecord.findMany({ where: { name: medicalRecordName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateMedicalRecord(adminId: string, input: AdminCreateMedicalRecordInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const medicalRecordData = await this.checkMedicalRecordExist(input.name)

      if (medicalRecordData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.medicalRecord.create({
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

  async adminUpdateMedicalRecord(adminId: string, medicalRecordId, input: AdminUpdateMedicalRecordInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalRecord.update({
      where: { id: medicalRecordId },
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

  async adminDeleteMedicalRecord(adminId: string, medicalRecordId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.medicalRecord.delete({ where: { id: medicalRecordId } })
  }
}

