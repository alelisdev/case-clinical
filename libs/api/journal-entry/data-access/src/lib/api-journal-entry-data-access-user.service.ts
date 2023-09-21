
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateJournalEntryInput } from './dto/user-create-journal-entry.input'
import { UserListJournalEntryInput } from './dto/user-list-journal-entry.input'
import { UserUpdateJournalEntryInput } from './dto/user-update-journal-entry.input'
import { UserUpdateJournalEntriesInput } from './dto/user-update-journal-entries.input'

import { UserListCaseAccountInput } from '@case-clinical/api/case-account/data-access'

@Injectable()
export class ApiJournalEntryDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userJournalEntries(userId: string, input?: UserListJournalEntryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntry.findMany({
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input?.caseAccountId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {caseAccount: true}
    })
  }

  async userSelectJournalEntries(userId: string, input?: UserListJournalEntryInput) {
    let name = input?.name ? input.name : undefined

    return this.data.journalEntry.findMany({
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input?.caseAccountId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountJournalEntries(userId: string, input?: UserListJournalEntryInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.journalEntry.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            caseAccountId: input?.caseAccountId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userJournalEntry(userId: string, journalEntryId) {

    return this.data.journalEntry.findUnique({ where: { id: journalEntryId } , include: {caseAccount: true}  })
  }

  async checkJournalEntryExist(journalEntryName: string) {
    try {
      return this.data.journalEntry.findMany({ where: { name: journalEntryName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateJournalEntry(userId: string, input: UserCreateJournalEntryInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const journalEntryData = await this.checkJournalEntryExist(input.name)

        if (journalEntryData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'JournalEntry', 'Create', input)

    let journalEntry = await this.data.journalEntry.create({
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

    await this.data.logEvent(sendingUser, false, 'JournalEntry', 'Create', journalEntry)

    return journalEntry

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Journal Entry')
    }

  }


  
  

  async userUpdateJournalEntry(userId: string, journalEntryId: string, input: UserUpdateJournalEntryInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!journalEntryId) {
        throw new BadRequestException('Journal Entry Id is required')
      } else {

      const journalEntryData = await this.checkJournalEntryExist(input.name)

      if (journalEntryData.length > 0) {
        if (journalEntryData[0].id != journalEntryId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'JournalEntry', 'Update', input)

    let journalEntry = this.data.journalEntry.update({
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

    await this.data.logEvent(sendingUser, false, 'JournalEntry', 'Update', journalEntry)

    return journalEntry

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Journal Entry')
    }
  }

  async userUpdateJournalEntries(userId: string, input: UserUpdateJournalEntriesInput): Promise<UpdateResult> {
    const total = input.journalEntries.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.journalEntries) {
      const inputData = input.journalEntries[key]

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
caseAccountId: inputData.caseAccountId, 

      }

      const journalEntryData = await this.checkJournalEntryExist(inputData.name)

      if (journalEntryData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.journalEntry.upsert({
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


  async userDeleteJournalEntry(userId: string, journalEntryId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!journalEntryId) {
        throw new BadRequestException('Journal Entry Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'JournalEntry', 'Delete', journalEntryId)

        let journalEntry = this.data.journalEntry.delete({
          where: { id: journalEntryId }
        })

        await this.data.logEvent(sendingUser, false, 'JournalEntry', 'Delete', journalEntry)

        return journalEntry

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Journal Entry')
    }
  }
}

