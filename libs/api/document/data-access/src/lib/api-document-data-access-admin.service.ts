
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateDocumentInput } from './dto/admin-create-document.input'
import { AdminListDocumentInput } from './dto/admin-list-document.input'
import { AdminListContractInput } from '@case-clinical/api/contract/data-access'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListUserInput } from '@case-clinical/api/user/data-access'
import { AdminListPatientStudyInput } from '@case-clinical/api/patient-study/data-access'
import { AdminListProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { AdminListMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access'
import { AdminUpdateDocumentInput } from './dto/admin-update-document.input'

@Injectable()
export class ApiDocumentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminDocuments(adminId: string, input?: AdminListDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.document.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true}
    })
  }

  async adminCountDocuments(adminId: string, input?: AdminListDocumentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.document.count(
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

  
  

  async adminDocument(adminId: string, documentId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.document.findUnique({ where: { id: documentId } , include: {contract: true, patient: true, procedureVendor: true, 
      medicalConditionProvider: true, assignedDocuments: true, eulas: true, prescriptions: true, bills: true, medicalReports: true} })
  }

  async checkDocumentExist(documentName: string) {
    try {
      return this.data.document.findMany({ where: { name: documentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateDocument(adminId: string, input: AdminCreateDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const documentData = await this.checkDocumentExist(input.name)

      if (documentData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.document.create({
          data: { 
      
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                procedureVendor: 
                input.procedureVendorId != null
                ? {
                        connect:  { 
                            id: input.procedureVendorId
                        }
                    }: undefined,  
                medicalConditionProvider: 
                input.medicalConditionProviderId != null
                ? {
                        connect:  { 
                            id: input.medicalConditionProviderId
                        }
                    }: undefined,name: input.name, 
attachment: input.attachment, 
encoding: input.encoding, 
extension: input.extension, 

    }
    , include: {contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true, assignedDocuments: true, eulas: true, prescriptions: true, 
      bills: true, medicalReports: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateDocument(adminId: string, documentId, input: AdminUpdateDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.document.update({
      where: { id: documentId },
      data: {
  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,   
                procedureVendor: 
                input.procedureVendorId != null
                ? {
                        connect:  { 
                            id: input.procedureVendorId
                        }
                    }: undefined,  
                medicalConditionProvider: 
                input.medicalConditionProviderId != null
                ? {
                        connect:  { 
                            id: input.medicalConditionProviderId
                        }
                    }: undefined,name: input.name, 
attachment: input.attachment, 
encoding: input.encoding, 
extension: input.extension, 

}
, include: {contract: true, patient: true,  procedureVendor: true, medicalConditionProvider: true, assignedDocuments: true, eulas: true, prescriptions: true, bills: true, medicalReports: true} 
    })
  }

  async adminDeleteDocument(adminId: string, documentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.document.delete({ where: { id: documentId } })
  }
}

