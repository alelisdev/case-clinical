
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateJournalEntryTemplateInput } from './dto/user-create-journal-entry-template.input'
import { UserListJournalEntryTemplateInput } from './dto/user-list-journal-entry-template.input'
import { UserUpdateJournalEntryTemplateInput } from './dto/user-update-journal-entry-template.input'
import { UserUpdateJournalEntryTemplatesInput } from './dto/user-update-journal-entry-templates.input'

import { UserListCaseAccountInput } from '@case-clinical/api/case-account/data-access'

@Injectable()
export class ApiJournalEntryTemplateDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userJournalEntryTemplates(userId: string, input?: UserListJournalEntryTemplateInput) {
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

  async userSelectJournalEntryTemplates(userId: string, input?: UserListJournalEntryTemplateInput) {
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

  async userCountJournalEntryTemplates(userId: string, input?: UserListJournalEntryTemplateInput): Promise<CorePaging> {
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

  async userJournalEntryTemplate(userId: string, journalEntryTemplateId) {

    return this.data.journalEntryTemplate.findUnique({ where: { id: journalEntryTemplateId } , include: {caseAccount: true}  })
  }

  async checkJournalEntryTemplateExist(journalEntryTemplateName: string) {
    try {
      return this.data.journalEntryTemplate.findMany({ where: { name: journalEntryTemplateName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateJournalEntryTemplate(userId: string, input: UserCreateJournalEntryTemplateInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const journalEntryTemplateData = await this.checkJournalEntryTemplateExist(input.name)

        if (journalEntryTemplateData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'JournalEntryTemplate', 'Create', input)

    let journalEntryTemplate = await this.data.journalEntryTemplate.create({
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

    await this.data.logEvent(sendingUser, false, 'JournalEntryTemplate', 'Create', journalEntryTemplate)

    return journalEntryTemplate

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Journal Entry Template')
    }

  }


  
  

  async userUpdateJournalEntryTemplate(userId: string, journalEntryTemplateId: string, input: UserUpdateJournalEntryTemplateInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!journalEntryTemplateId) {
        throw new BadRequestException('Journal Entry Template Id is required')
      } else {

      const journalEntryTemplateData = await this.checkJournalEntryTemplateExist(input.name)

      if (journalEntryTemplateData.length > 0) {
        if (journalEntryTemplateData[0].id != journalEntryTemplateId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'JournalEntryTemplate', 'Update', input)

    let journalEntryTemplate = this.data.journalEntryTemplate.update({
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

    await this.data.logEvent(sendingUser, false, 'JournalEntryTemplate', 'Update', journalEntryTemplate)

    return journalEntryTemplate

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Journal Entry Template')
    }
  }

  async userUpdateJournalEntryTemplates(userId: string, input: UserUpdateJournalEntryTemplatesInput): Promise<UpdateResult> {
    const total = input.journalEntryTemplates.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.journalEntryTemplates) {
      const inputData = input.journalEntryTemplates[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
locationName: inputData.locationName, 
fromTo: inputData.fromTo, 
frequency: inputData.frequency, 
autoOrManual: inputData.autoOrManual, 
process: inputData.process, 
perAccountOrAggregateJE: inputData.perAccountOrAggregateJE, 
costRate: inputData.costRate, 
postingDate: inputData.postingDate, 
documentDate: inputData.documentDate, 
dueDate: inputData.dueDate, 
amount: inputData.amount, 
accountType: inputData.accountType, 
accountNumber: inputData.accountNumber, 
costCenter: inputData.costCenter, 
appliesToDocumentNumber: inputData.appliesToDocumentNumber, 
ordinal: inputData.ordinal, 
scenario: inputData.scenario, 
caseAccountId: inputData.caseAccountId, 

      }

      const journalEntryTemplateData = await this.checkJournalEntryTemplateExist(inputData.name)

      if (journalEntryTemplateData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.journalEntryTemplate.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteJournalEntryTemplate(userId: string, journalEntryTemplateId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!journalEntryTemplateId) {
        throw new BadRequestException('Journal Entry Template Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'JournalEntryTemplate', 'Delete', journalEntryTemplateId)

        let journalEntryTemplate = this.data.journalEntryTemplate.delete({
          where: { id: journalEntryTemplateId }
        })

        await this.data.logEvent(sendingUser, false, 'JournalEntryTemplate', 'Delete', journalEntryTemplate)

        return journalEntryTemplate

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Journal Entry Template')
    }
  }
}

