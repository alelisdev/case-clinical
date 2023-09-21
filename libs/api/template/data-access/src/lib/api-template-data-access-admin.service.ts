
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateTemplateInput } from './dto/admin-create-template.input'
import { AdminListTemplateInput } from './dto/admin-list-template.input'

import { AdminUpdateTemplateInput } from './dto/admin-update-template.input'

@Injectable()
export class ApiTemplateDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTemplates(adminId: string, input?: AdminListTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.template.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {assignedDocuments: true, contracts: true} 
    })
  }

  async adminCountTemplates(adminId: string, input?: AdminListTemplateInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.template.count(
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

  
  

  async adminTemplate(adminId: string, templateId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.template.findUnique({ where: { id: templateId } , include: {assignedDocuments: true, contracts: true} })
  }

  async adminCreateTemplate(adminId: string, input: AdminCreateTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.template.create({
      data: { 
  assignedDocuments:  input.assignedDocuments != null
                    ? {
                    createMany: {
                        data: [
                            ...input.assignedDocuments,
                        ]
                    },
                }: undefined,  contracts:  input.contracts != null
                    ? {
                    createMany: {
                        data: [
                            ...input.contracts,
                        ]
                    },
                }: undefined,name: input.name, 
attachment: input.attachment, 
encoding: input.encoding, 
signatureFileType: input.signatureFileType, 

}
, include: {assignedDocuments: true, contracts: true} 
    })
  }

  async adminUpdateTemplate(adminId: string, templateId, input: AdminUpdateTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.template.update({
      where: { id: templateId },
      data: {
  assignedDocuments:  input.assignedDocuments != null
                    ? {
                    createMany: {
                        data: [
                            ...input.assignedDocuments,
                        ]
                    },
                }: undefined,  contracts:  input.contracts != null
                    ? {
                    createMany: {
                        data: [
                            ...input.contracts,
                        ]
                    },
                }: undefined,name: input.name, 
attachment: input.attachment, 
encoding: input.encoding, 
signatureFileType: input.signatureFileType, 

}
, include: {assignedDocuments: true, contracts: true} 
    })
  }

  async adminDeleteTemplate(adminId: string, templateId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.template.delete({ where: { id: templateId } })
  }
}

