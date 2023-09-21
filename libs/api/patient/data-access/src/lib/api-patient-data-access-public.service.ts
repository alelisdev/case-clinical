
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPatientInput } from './dto/user-list-patient.input'

@Injectable()
export class ApiPatientDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPatients(input?: UserListPatientInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patient.findMany({
      where: {
            AND: [{
            name: { contains: name },
            ethnicityId: input.ethnicityId,
genderId: input.genderId,
languageId: input.languageId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {ethnicity: true, gender: true, language: true}
    })
  }

  async publicSelectPatients(input?: UserListPatientInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patient.findMany({
      where: {
            AND: [{
            name: { contains: name },
            ethnicityId: input.ethnicityId,
genderId: input.genderId,
languageId: input.languageId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPatients(input?: UserListPatientInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.patient.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            ethnicityId: input.ethnicityId,
genderId: input.genderId,
languageId: input.languageId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPatient(patientId) {

    return this.data.patient.findUnique({ where: { id: patientId } , include: {ethnicity: true, gender: true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true, users: true}  })
  }
}


