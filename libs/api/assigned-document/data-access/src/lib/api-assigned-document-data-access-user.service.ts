
import { HttpService, Injectable } from '@nestjs/common'
import * as axios from 'axios'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateAssignedDocumentInput } from './dto/user-create-assigned-document.input'
import { UserListAssignedDocumentInput } from './dto/user-list-assigned-document.input'
import { UserUpdateAssignedDocumentInput } from './dto/user-update-assigned-document.input'
import { map, switchMap, tap } from 'rxjs'


@Injectable()
export class ApiAssignedDocumentDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService,
    private readonly http: HttpService) {}

  async userAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput) {

    return this.data.assignedDocument.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            documentId: input.documentId,
templateId: input.templateId,
documentTypeId: input.documentTypeId,
userId: input.userId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { document: true, template: true, documentType: true, user: true }
    })
  }


  async userCountAssignedDocuments(userId: string, input?: UserListAssignedDocumentInput): Promise<CorePaging> {

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

  async userAssignedDocument(userId: string, assignedDocumentId) {
    return this.data.assignedDocument.findUnique({ where: { id: assignedDocumentId } ,include: { document: true, template: true, documentType: true, user: true } })
  }

  async userRenderAssignedDocument(userId: string, model: string , template: string) {
    try {
      const response = await axios.default.post(process.env.DOCUMENT_SERVER_URL + '/DownloadPdfFromMergeRequest', {data: model, template})
      return response.data?.document
    } catch (error) {
      console.log(error) 
    }

  }

  async userCreateAssignedDocument(userId: string, input: UserCreateAssignedDocumentInput) {

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
entityId: input.entityId, 

}
,include: { document: true, template: true, documentType: true, user: true }
    })
  }

  
  

  async userUpdateAssignedDocument(userId: string, assignedDocumentId: string, input: UserUpdateAssignedDocumentInput) {

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

  async userDeleteAssignedDocument(userId: string, assignedDocumentId: string) {
    return this.data.assignedDocument.delete({ where: { id: assignedDocumentId } })
  }
}

