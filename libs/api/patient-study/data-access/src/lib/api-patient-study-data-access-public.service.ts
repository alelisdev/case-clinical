
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPatientStudyInput } from './dto/user-list-patient-study.input'

@Injectable()
export class ApiPatientStudyDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPatientStudies(input?: UserListPatientStudyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientStudy.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true}
    })
  }

  async publicSelectPatientStudies(input?: UserListPatientStudyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientStudy.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPatientStudies(input?: UserListPatientStudyInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.patientStudy.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input.patientId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPatientStudy(patientStudyId) {

    return this.data.patientStudy.findUnique({ where: { id: patientStudyId } , include: {patient: true, documents: true}  })
  }
}


