
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateAssignedDocumentInput } from './dto/admin-create-assigned-document.input'
import { AdminListAssignedDocumentInput } from './dto/admin-list-assigned-document.input'

import { AdminUpdateAssignedDocumentInput } from './dto/admin-update-assigned-document.input'

@Injectable()
export class ApiAssignedDocumentDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminAssignedDocuments(adminId: string, input?: AdminListAssignedDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { document: true, template: true, documentType: true, user: true }
    })
  }

  async adminCountAssignedDocuments(adminId: string, input?: AdminListAssignedDocumentInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.assignedDocument.count(
    {
      where: { 
            name: { 
                contains: input?.name
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

  
  

  async adminAssignedDocument(adminId: string, assignedDocumentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.findUnique({ where: { id: assignedDocumentId } ,include: { document: true, template: true, documentType: true, user: true }})
  }

  async adminCreateAssignedDocument(adminId: string, input: AdminCreateAssignedDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.create({
      data: { 
  
                document: 
                input.documentId != null
                ? {
                        connect:  { 
                            id: input.documentId
                        }
                    }: undefined,  
                template: 
                input.templateId != null
                ? {
                        connect:  { 
                            id: input.templateId
                        }
                    }: undefined,  
                documentType: 
                input.documentTypeId != null
                ? {
                        connect:  { 
                            id: input.documentTypeId
                        }
                    }: undefined,  
                user: 
                input.userId != null
                ? {
                        connect:  { 
                            id: input.userId
                        }
                    }: undefined,name: input.name, 
expirationDate: input.expirationDate, 
entityName: input.entityName, 

}
,include: { document: true, template: true, documentType: true, user: true }
    })
  }

  async adminUpdateAssignedDocument(adminId: string, assignedDocumentId, input: AdminUpdateAssignedDocumentInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.update({
      where: { id: assignedDocumentId },
      data: {
      name: input.name,
      expirationDate: input.expirationDate,
      entityName: input.entityName,
      entityId: input.entityId,
      documentId: input.documentId,
      templateId: input.templateId,
      documentTypeId: input.documentTypeId,
      userId: input.userId
}
,include: { document: true, template: true, documentType: true, user: true }
    })
  }

  async adminDeleteAssignedDocument(adminId: string, assignedDocumentId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.assignedDocument.delete({ where: { id: assignedDocumentId } })
  }
}

