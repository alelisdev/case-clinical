
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePatientStudyInput } from './dto/admin-create-patient-study.input'
import { AdminListPatientStudyInput } from './dto/admin-list-patient-study.input'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminUpdatePatientStudyInput } from './dto/admin-update-patient-study.input'

@Injectable()
export class ApiPatientStudyDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPatientStudies(adminId: string, input?: AdminListPatientStudyInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.patientStudy.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true}
    })
  }

  async adminCountPatientStudies(adminId: string, input?: AdminListPatientStudyInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.patientStudy.count(
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

  
  

  async adminPatientStudy(adminId: string, patientStudyId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.patientStudy.findUnique({ where: { id: patientStudyId } , include: {patient: true, documents: true} })
  }

  async checkPatientStudyExist(patientStudyName: string) {
    try {
      return this.data.patientStudy.findMany({ where: { name: patientStudyName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePatientStudy(adminId: string, input: AdminCreatePatientStudyInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const patientStudyData = await this.checkPatientStudyExist(input.name)

      if (patientStudyData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.patientStudy.create({
          data: { 
      
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {patient: true, documents: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePatientStudy(adminId: string, patientStudyId, input: AdminUpdatePatientStudyInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patientStudy.update({
      where: { id: patientStudyId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 

}
, include: {patient: true, documents: true} 
    })
  }

  async adminDeletePatientStudy(adminId: string, patientStudyId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patientStudy.delete({ where: { id: patientStudyId } })
  }
}

