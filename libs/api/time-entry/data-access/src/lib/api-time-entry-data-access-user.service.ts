
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { UserCreateTimeEntryInput } from './dto/user-create-time-entry.input'
import { UserListTimeEntryInput } from './dto/user-list-time-entry.input'
import { UserUpdateTimeEntryInput } from './dto/user-update-time-entry.input'


@Injectable()
export class ApiTimeEntryDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userTimeEntries(userId: string, input?: UserListTimeEntryInput) {

    return this.data.timeEntry.findMany({
      where: {
            AND: [{
            name: { contains: input?.name },
            legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip ,include: { legalCase: true }
    })
  }


  async userCountTimeEntries(userId: string, input?: UserListTimeEntryInput): Promise<CorePaging> {

    const total = await this.data.timeEntry.count(
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

  async userTimeEntry(userId: string, timeEntryId) {

    return this.data.timeEntry.findUnique({ where: { id: timeEntryId } ,include: { legalCase: true } })
  }

  async userCreateTimeEntry(userId: string, input: UserCreateTimeEntryInput) {

    return this.data.timeEntry.create({
      data: { 
  
            legalCase: 
            input.legalCaseId != null
            ? {
                    connect:  { 
                        id: input.legalCaseId
                    }
                }: undefined,name: input.name, 
date: input.date, 
rate: input.rate, 
hours: input.hours, 
description: input.description, 
isBilled: input.isBilled, 

}
,include: { legalCase: true }
    })
  }

  
  

  async userUpdateTimeEntry(userId: string, timeEntryId: string, input: UserUpdateTimeEntryInput) {

    return this.data.timeEntry.update({
      where: { id: timeEntryId },
      data: {
      name: input.name,
      legalCaseId: input.legalCaseId,
      date: input.date,
      rate: input.rate,
      hours: input.hours,
      description: input.description,
      isBilled: input.isBilled
}
,include: { legalCase: true }
    })
  }

  async userDeleteTimeEntry(userId: string, timeEntryId: string) {
    return this.data.timeEntry.delete({ where: { id: timeEntryId } })
  }
}

