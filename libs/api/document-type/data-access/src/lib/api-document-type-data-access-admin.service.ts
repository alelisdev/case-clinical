
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateDocumentTypeInput } from './dto/admin-create-document-type.input'
import { AdminListDocumentTypeInput } from './dto/admin-list-document-type.input'

import { AdminUpdateDocumentTypeInput } from './dto/admin-update-document-type.input'

@Injectable()
export class ApiDocumentTypeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminDocumentTypes(adminId: string, input?: AdminListDocumentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.documentType.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountDocumentTypes(adminId: string, input?: AdminListDocumentTypeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.documentType.count(
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

  
  

  async adminDocumentType(adminId: string, documentTypeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.documentType.findUnique({ where: { id: documentTypeId } , include: {assignedDocuments: true} })
  }

  async checkDocumentTypeExist(documentTypeName: string) {
    try {
      return this.data.documentType.findMany({ where: { name: documentTypeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateDocumentType(adminId: string, input: AdminCreateDocumentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const documentTypeData = await this.checkDocumentTypeExist(input.name)

      if (documentTypeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.documentType.create({
          data: { 
    name: input.name, 

    }
    , include: {assignedDocuments: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateDocumentType(adminId: string, documentTypeId, input: AdminUpdateDocumentTypeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.documentType.update({
      where: { id: documentTypeId },
      data: {
name: input.name, 

}
, include: {assignedDocuments: true} 
    })
  }

  async adminDeleteDocumentType(adminId: string, documentTypeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.documentType.delete({ where: { id: documentTypeId } })
  }
}

