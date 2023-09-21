
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListDocumentInput } from './dto/user-list-document.input'

@Injectable()
export class ApiDocumentDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicDocuments(input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.document.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, procedureVendor: true, medicalConditionProvider: true}
    })
  }

  async publicSelectDocuments(input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.document.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountDocuments(input?: UserListDocumentInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.document.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicDocument(documentId) {

    return this.data.document.findUnique({ where: { id: documentId } , include: {contract: true, patient: true, 
      procedureVendor: true, medicalConditionProvider: true, 
      assignedDocuments: true, eulas: true, prescriptions: true, bills: true, medicalReports: true}  })
  }
}


