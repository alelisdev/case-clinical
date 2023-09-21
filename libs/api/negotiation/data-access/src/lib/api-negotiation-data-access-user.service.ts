import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging, CorePagingInput } from '@case-clinical/api/core/data-access'
import { UserCreateNegotiationInput } from './dto/user-create-negotiation.input'
import { UserListNegotiationInput } from './dto/user-list-negotiation.input'
import { UserUpdateNegotiationInput } from './dto/user-update-negotiation.input'

@Injectable()
export class ApiNegotiationDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userNegotiations(userId: string, input?: UserListNegotiationInput) {
    return this.data.negotiation.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
            partyFromId: input.partyFromId,
            partyToId: input.partyToId,
            attachmentId: input.attachmentId,
            legalCaseId: input.legalCaseId,
            negotiationKindId: input.negotiationKindId,
            partyFromKindId: input.partyFromKindId,
            partyToKindId: input.partyToKindId,
            responseKindId: input.responseKindId,
            respondedToDemandId: input.respondedToDemandId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: {
        partyFrom: true,
        partyTo: true,
        attachment: true,
        legalCase: true,
        negotiationKind: true,
        partyFromKind: true,
        partyToKind: true,
        responseKind: true,
        respondedToDemand: true,
      },
    })
  }

  async userCountNegotiations(userId: string, input?: UserListNegotiationInput): Promise<CorePaging> {
    const total = await this.data.negotiation.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userNegotiation(userId: string, negotiationId) {
    return this.data.negotiation.findUnique({
      where: { id: negotiationId },
      include: {
        partyFrom: true,
        partyTo: true,
        attachment: true,
        legalCase: true,
        negotiationKind: true,
        partyFromKind: true,
        partyToKind: true,
        responseKind: true,
        respondedToDemand: true,
      },
    })
  }

  async userCreateNegotiation(userId: string, input: UserCreateNegotiationInput) {
    return this.data.negotiation.create({
      data: {
        name: input.name,
        negotiationKindId: input.negotiationKindId,
        legalCaseId: input.legalCaseId,
        amount: input.amount,
        partyToId: input.partyToId,
        dateServed: input.dateServed,
        dueDate: input.dueDate,
        dateCompleted: input.dateCompleted,
        respondedToDemandId: input.respondedToDemandId,
        responseDate: input.responseDate,
        responseKindId: input.responseKindId,
        notes: input.notes,
        attachmentId: input.attachmentId,
        partyToKindId: input.partyToKindId,
      },
      include: {
        partyFrom: true,
        partyTo: true,
        attachment: true,
        legalCase: true,
        negotiationKind: true,
        partyFromKind: true,
        partyToKind: true,
        responseKind: true,
        respondedToDemand: true,
      },
    })
  }

  async userUpdateNegotiation(userId: string, negotiationId: string, input: UserUpdateNegotiationInput) {
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
        partyToKindId: input.partyToKindId,
      },
      include: {
        partyFrom: true,
        partyTo: true,
        attachment: true,
        legalCase: true,
        negotiationKind: true,
        partyFromKind: true,
        partyToKind: true,
        responseKind: true,
        respondedToDemand: true,
      },
    })
  }

  async userDeleteNegotiation(userId: string, negotiationId: string) {
    return this.data.negotiation.delete({ where: { id: negotiationId } })
  }
}
