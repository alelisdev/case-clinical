
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateTimeEntryInput } from './dto/admin-create-time-entry.input'
import { AdminListTimeEntryInput } from './dto/admin-list-time-entry.input'

import { AdminUpdateTimeEntryInput } from './dto/admin-update-time-entry.input'

@Injectable()
export class ApiTimeEntryDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminTimeEntries(adminId: string, input?: AdminListTimeEntryInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.timeEntry.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { legalCase: true }
    })
  }

  async adminCountTimeEntries(adminId: string, input?: AdminListTimeEntryInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

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

  
  

  async adminTimeEntry(adminId: string, timeEntryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.timeEntry.findUnique({ where: { id: timeEntryId } ,include: { legalCase: true }})
  }

  async adminCreateTimeEntry(adminId: string, input: AdminCreateTimeEntryInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminUpdateTimeEntry(adminId: string, timeEntryId, input: AdminUpdateTimeEntryInput) {
    await this.data.ensureAdminUser(adminId)

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

  async adminDeleteTimeEntry(adminId: string, timeEntryId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.timeEntry.delete({ where: { id: timeEntryId } })
  }
}

