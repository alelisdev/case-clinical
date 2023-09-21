
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateJournalEntryTemplateInput } from './dto/admin-create-journal-entry-template.input'
import { AdminListJournalEntryTemplateInput } from './dto/admin-list-journal-entry-template.input'
import { AdminListCaseAccountInput } from '@case-clinical/api/case-account/data-access'
import { AdminUpdateJournalEntryTemplateInput } from './dto/admin-update-journal-entry-template.input'

@Injectable()
export class ApiJournalEntryTemplateDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminJournalEntryTemplates(adminId: string, input?: AdminListJournalEntryTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.journalEntryTemplate.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {caseAccount: true}
    })
  }

  async adminCountJournalEntryTemplates(adminId: string, input?: AdminListJournalEntryTemplateInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.journalEntryTemplate.count(
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

  
  

  async adminJournalEntryTemplate(adminId: string, journalEntryTemplateId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.journalEntryTemplate.findUnique({ where: { id: journalEntryTemplateId } , include: {caseAccount: true} })
  }

  async checkJournalEntryTemplateExist(journalEntryTemplateName: string) {
    try {
      return this.data.journalEntryTemplate.findMany({ where: { name: journalEntryTemplateName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateJournalEntryTemplate(adminId: string, input: AdminCreateJournalEntryTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const journalEntryTemplateData = await this.checkJournalEntryTemplateExist(input.name)

      if (journalEntryTemplateData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.journalEntryTemplate.create({
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
ordinal: input.ordinal, 
scenario: input.scenario, 

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

  async adminUpdateJournalEntryTemplate(adminId: string, journalEntryTemplateId, input: AdminUpdateJournalEntryTemplateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.journalEntryTemplate.update({
      where: { id: journalEntryTemplateId },
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
ordinal: input.ordinal, 
scenario: input.scenario, 

}
, include: {caseAccount: true} 
    })
  }

  async adminDeleteJournalEntryTemplate(adminId: string, journalEntryTemplateId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.journalEntryTemplate.delete({ where: { id: journalEntryTemplateId } })
  }
}

