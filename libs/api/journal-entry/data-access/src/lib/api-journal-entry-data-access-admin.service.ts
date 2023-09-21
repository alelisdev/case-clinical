
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateJournalEntryInput } from './dto/admin-create-journal-entry.input'
import { AdminListJournalEntryInput } from './dto/admin-list-journal-entry.input'
import { AdminListCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { AdminUpdateJournalEntryInput } from './dto/admin-update-journal-entry.input'

@Injectable()
export class ApiJournalEntryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminJournalEntries(adminId: string, input?: AdminListJournalEntryInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.journalEntry.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {caseAccount: true}
    })
  }

  async adminCountJournalEntries(adminId: string, input?: AdminListJournalEntryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.journalEntry.count(
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

  
  

  async adminJournalEntry(adminId: string, journalEntryId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.journalEntry.findUnique({ where: { id: journalEntryId } , include: {caseAccount: true} })
  }

  async checkJournalEntryExist(journalEntryName: string) {
    try {
      return this.data.journalEntry.findMany({ where: { name: journalEntryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateJournalEntry(adminId: string, input: AdminCreateJournalEntryInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const journalEntryData = await this.checkJournalEntryExist(input.name)

      if (journalEntryData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.journalEntry.create({
          data: { 
      
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
locationName: input.locationName, 
fromTo: input.fromTo, 
frequency: input.frequency, 
autoOrManual: input.autoOrManual, 
process: input.process, 
perAccountOrAggregateJE: input.perAccountOrAggregateJE, 
costRate: input.costRate, 
postingDate: input.postingDate, 
documentDate: input.documentDate, 
dueDate: input.dueDate, 
amount: input.amount, 
accountType: input.accountType, 
accountNumber: input.accountNumber, 
costCenter: input.costCenter, 
appliesToDocumentNumber: input.appliesToDocumentNumber, 

    }
    , include: {caseAccount: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateJournalEntry(adminId: string, journalEntryId, input: AdminUpdateJournalEntryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.journalEntry.update({
      where: { id: journalEntryId },
      data: {
  
                caseAccount: 
                input.caseAccountId != null
                ? {
                        connect:  { 
                            id: input.caseAccountId
                        }
                    }: undefined,name: input.name, 
locationName: input.locationName, 
fromTo: input.fromTo, 
frequency: input.frequency, 
autoOrManual: input.autoOrManual, 
process: input.process, 
perAccountOrAggregateJE: input.perAccountOrAggregateJE, 
costRate: input.costRate, 
postingDate: input.postingDate, 
documentDate: input.documentDate, 
dueDate: input.dueDate, 
amount: input.amount, 
accountType: input.accountType, 
accountNumber: input.accountNumber, 
costCenter: input.costCenter, 
appliesToDocumentNumber: input.appliesToDocumentNumber, 

}
, include: {caseAccount: true} 
    })
  }

  async adminDeleteJournalEntry(adminId: string, journalEntryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.journalEntry.delete({ where: { id: journalEntryId } })
  }
}

