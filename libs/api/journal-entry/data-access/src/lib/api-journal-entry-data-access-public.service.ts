
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListJournalEntryInput } from './dto/user-list-journal-entry.input'

@Injectable()
export class ApiJournalEntryDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicJournalEntries(input?: UserListJournalEntryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntry.findMany({
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input.caseAccountId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {caseAccount: true}
    })
  }

  async publicSelectJournalEntries(input?: UserListJournalEntryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntry.findMany({
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

  async publicCountJournalEntries(input?: UserListJournalEntryInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.journalEntry.count(
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

  async publicJournalEntry(journalEntryId) {

    return this.data.journalEntry.findUnique({ where: { id: journalEntryId } , include: {caseAccount: true}  })
  }
}


