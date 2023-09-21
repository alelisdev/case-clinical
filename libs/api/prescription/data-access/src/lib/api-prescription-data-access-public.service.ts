
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPrescriptionInput } from './dto/user-list-prescription.input'

@Injectable()
export class ApiPrescriptionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPrescriptions(input?: UserListPrescriptionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.prescription.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
documentId: input.documentId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true, document: true}
    })
  }

  async publicSelectPrescriptions(input?: UserListPrescriptionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.prescription.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
documentId: input.documentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPrescriptions(input?: UserListPrescriptionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.prescription.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,
documentId: input.documentId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPrescription(prescriptionId) {

    return this.data.prescription.findUnique({ where: { id: prescriptionId } , include: {patient: true, document: true}  })
  }
}


