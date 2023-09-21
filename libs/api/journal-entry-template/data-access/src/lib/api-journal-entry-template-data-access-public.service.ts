
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListJournalEntryTemplateInput } from './dto/user-list-journal-entry-template.input'

@Injectable()
export class ApiJournalEntryTemplateDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicJournalEntryTemplates(input?: UserListJournalEntryTemplateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntryTemplate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input.caseAccountId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {caseAccount: true}
    })
  }

  async publicSelectJournalEntryTemplates(input?: UserListJournalEntryTemplateInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntryTemplate.findMany({
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input.caseAccountId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountJournalEntryTemplates(input?: UserListJournalEntryTemplateInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.journalEntryTemplate.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input.caseAccountId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicJournalEntryTemplate(journalEntryTemplateId) {

    return this.data.journalEntryTemplate.findUnique({ where: { id: journalEntryTemplateId } , include: {caseAccount: true}  })
  }
}


