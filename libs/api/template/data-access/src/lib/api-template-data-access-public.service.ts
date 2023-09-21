
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListTemplateInput } from './dto/user-list-template.input'

@Injectable()
export class ApiTemplateDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicTemplates(input?: UserListTemplateInput) {

    return this.data.template.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            }]
          },
      take: input?.limit,
      skip: input?.skip , include: {assignedDocuments: true, contracts: true} 
    })
  }

  async publicSelectTemplates(input?: UserListTemplateInput) {
    return this.data.template.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async publicCountTemplates(input?: UserListTemplateInput): Promise<CorePaging> {

    const total = await this.data.template.count(
    {
      where: {
            AND: [{
            name: { contains: input?.name },
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

  async publicTemplate(templateId) {

    return this.data.template.findUnique({ where: { id: templateId } , include: {assignedDocuments: true, contracts: true}  })
  }
}


