
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePrescriptionInput } from './dto/admin-create-prescription.input'
import { AdminListPrescriptionInput } from './dto/admin-list-prescription.input'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminUpdatePrescriptionInput } from './dto/admin-update-prescription.input'

@Injectable()
export class ApiPrescriptionDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPrescriptions(adminId: string, input?: AdminListPrescriptionInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.prescription.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, document: true}
    })
  }

  async adminCountPrescriptions(adminId: string, input?: AdminListPrescriptionInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.prescription.count(
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

  
  

  async adminPrescription(adminId: string, prescriptionId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.prescription.findUnique({ where: { id: prescriptionId } , include: {patient: true, document: true} })
  }

  async checkPrescriptionExist(prescriptionName: string) {
    try {
      return this.data.prescription.findMany({ where: { name: prescriptionName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePrescription(adminId: string, input: AdminCreatePrescriptionInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const prescriptionData = await this.checkPrescriptionExist(input.name)

      if (prescriptionData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.prescription.create({
          data: { 
      
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                document: 
                input.documentId != null
                ? {
                        connect:  { 
                            id: input.documentId
                        }
                    }: undefined,name: input.name, 
medicalProvider: input.medicalProvider, 
dateWritten: input.dateWritten, 
days: input.days, 
note: input.note, 
category: input.category, 
kind: input.kind, 
quantity: input.quantity, 
refills: input.refills, 
rxNumber: input.rxNumber, 
sig: input.sig, 
strength: input.strength, 
unit: input.unit, 

    }
    , include: {patient: true, document: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePrescription(adminId: string, prescriptionId, input: AdminUpdatePrescriptionInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.prescription.update({
      where: { id: prescriptionId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                document: 
                input.documentId != null
                ? {
                        connect:  { 
                            id: input.documentId
                        }
                    }: undefined,name: input.name, 
medicalProvider: input.medicalProvider, 
dateWritten: input.dateWritten, 
days: input.days, 
note: input.note, 
category: input.category, 
kind: input.kind, 
quantity: input.quantity, 
refills: input.refills, 
rxNumber: input.rxNumber, 
sig: input.sig, 
strength: input.strength, 
unit: input.unit, 

}
, include: {patient: true, document: true} 
    })
  }

  async adminDeletePrescription(adminId: string, prescriptionId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.prescription.delete({ where: { id: prescriptionId } })
  }
}

