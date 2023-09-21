
import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'

import { AdminCreateNegotiationInput } from './dto/admin-create-negotiation.input'
import { AdminListNegotiationInput } from './dto/admin-list-negotiation.input'

import { AdminUpdateNegotiationInput } from './dto/admin-update-negotiation.input'

@Injectable()
export class ApiNegotiationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminNegotiations(adminId: string, input?: AdminListNegotiationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.negotiation.findMany({
      where: { 
            name: { 
                contains: input?.name
            }
          },
      take: input?.limit,
      skip: input?.skip ,include: { partyFrom: true, partyTo: true, attachment: true, legalCase: true, negotiationKind: true, partyFromKind: true, partyToKind: true, responseKind: true, respondedToDemand: true }
    })
  }

  async adminCountNegotiations(adminId: string, input?: AdminListNegotiationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)

    const total = await this.data.negotiation.count(
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

  
  

  async adminNegotiation(adminId: string, negotiationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.negotiation.findUnique({ where: { id: negotiationId } ,include: { partyFrom: true, partyTo: true, attachment: true, legalCase: true, negotiationKind: true, partyFromKind: true, partyToKind: true, responseKind: true, respondedToDemand: true }})
  }

  async adminCreateNegotiation(adminId: string, input: AdminCreateNegotiationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.negotiation.create({
      data: { 
  
            partyFrom: 
            input.partyFromId != null
            ? {
                    connect:  { 
                        id: input.partyFromId
                    }
                }: undefined,  
            partyTo: 
            input.partyToId != null
            ? {
                    connect:  { 
                        id: input.partyToId
                    }
                }: undefined,  
            attachment: 
            input.attachmentId != null
            ? {
                    connect:  { 
                        id: input.attachmentId
                    }
                }: undefined,  
            legalCase: 
            input.legalCaseId != null
            ? {
                    connect:  { 
                        id: input.legalCaseId
                    }
                }: undefined,  
            negotiationKind: 
            input.negotiationKindId != null
            ? {
                    connect:  { 
                        id: input.negotiationKindId
                    }
                }: undefined,  
            partyFromKind: 
            input.partyFromKindId != null
            ? {
                    connect:  { 
                        id: input.partyFromKindId
                    }
                }: undefined,  
            partyToKind: 
            input.partyToKindId != null
            ? {
                    connect:  { 
                        id: input.partyToKindId
                    }
                }: undefined,  
            responseKind: 
            input.responseKindId != null
            ? {
                    connect:  { 
                        id: input.responseKindId
                    }
                }: undefined,  
            respondedToDemand: 
            input.respondedToDemandId != null
            ? {
                    connect:  { 
                        id: input.respondedToDemandId
                    }
                }: undefined,
                name: input.name, 
amount: input.amount, 
dateServed: input.dateServed, 
dueDate: input.dueDate, 
dateCompleted: input.dateCompleted, 
responseDate: input.responseDate, 
notes: input.notes, 


}
,include: { partyFrom: true, partyTo: true, attachment: true, legalCase: true, negotiationKind: true, partyFromKind: true, partyToKind: true, responseKind: true, respondedToDemand: true }
    })
  }

  async adminUpdateNegotiation(adminId: string, negotiationId, input: AdminUpdateNegotiationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.negotiation.update({
      where: { id: negotiationId },
      data: {
      name: input.name,
      negotiationKindId: input.negotiationKindId,
      legalCaseId: input.legalCaseId,
      amount: input.amount,
      partyFromId: input.partyFromId,
      partyToId: input.partyToId,
      dateServed: input.dateServed,
      dueDate: input.dueDate,
      dateCompleted: input.dateCompleted,
      respondedToDemandId: input.respondedToDemandId,
      responseDate: input.responseDate,
      responseKindId: input.responseKindId,
      notes: input.notes,
      attachmentId: input.attachmentId,
      partyFromKindId: input.partyFromKindId,
      partyToKindId: input.partyToKindId
}
,include: { partyFrom: true, partyTo: true, attachment: true, legalCase: true, negotiationKind: true, partyFromKind: true, partyToKind: true, responseKind: true, respondedToDemand: true }
    })
  }

  async adminDeleteNegotiation(adminId: string, negotiationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.negotiation.delete({ where: { id: negotiationId } })
  }
}

