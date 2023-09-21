
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListMedicalRecordInput } from './dto/user-list-medical-record.input'

@Injectable()
export class ApiMedicalRecordDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicMedicalRecords(input?: UserListMedicalRecordInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecord.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async publicSelectMedicalRecords(input?: UserListMedicalRecordInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecord.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountMedicalRecords(input?: UserListMedicalRecordInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalRecord.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input.clinicalProviderId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicMedicalRecord(medicalRecordId) {

    return this.data.medicalRecord.findUnique({ where: { id: medicalRecordId } , include: {clinicalProvider: true}  })
  }
}


