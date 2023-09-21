
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListDocumentTypeInput } from './dto/user-list-document-type.input'

@Injectable()
export class ApiDocumentTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicDocumentTypes(input?: UserListDocumentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.documentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectDocumentTypes(input?: UserListDocumentTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.documentType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountDocumentTypes(input?: UserListDocumentTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.documentType.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicDocumentType(documentTypeId) {

    return this.data.documentType.findUnique({ where: { id: documentTypeId } , include: {assignedDocuments: true}  })
  }
}


