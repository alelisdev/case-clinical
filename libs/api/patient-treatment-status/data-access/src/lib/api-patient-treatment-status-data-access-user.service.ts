
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePatientTreatmentStatusInput } from './dto/user-create-patient-treatment-status.input'
import { UserListPatientTreatmentStatusInput } from './dto/user-list-patient-treatment-status.input'
import { UserUpdatePatientTreatmentStatusInput } from './dto/user-update-patient-treatment-status.input'
import { UserUpdatePatientTreatmentStatusesInput } from './dto/user-update-patient-treatment-statuses.input'



@Injectable()
export class ApiPatientTreatmentStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPatientTreatmentStatuses(userId: string, input?: UserListPatientTreatmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientTreatmentStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectPatientTreatmentStatuses(userId: string, input?: UserListPatientTreatmentStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientTreatmentStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPatientTreatmentStatuses(userId: string, input?: UserListPatientTreatmentStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.patientTreatmentStatus.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPatientTreatmentStatus(userId: string, patientTreatmentStatusId) {

    return this.data.patientTreatmentStatus.findUnique({ where: { id: patientTreatmentStatusId } , include: {legalCases: { include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}}}  })
  }

  async checkPatientTreatmentStatusExist(patientTreatmentStatusName: string) {
    try {
      return this.data.patientTreatmentStatus.findMany({ where: { name: patientTreatmentStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePatientTreatmentStatus(userId: string, input: UserCreatePatientTreatmentStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const patientTreatmentStatusData = await this.checkPatientTreatmentStatusExist(input.name)

        if (patientTreatmentStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'PatientTreatmentStatus', 'Create', input)

    let patientTreatmentStatus = await this.data.patientTreatmentStatus.create({
      data: { 
name: input.name, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PatientTreatmentStatus', 'Create', patientTreatmentStatus)

    return patientTreatmentStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Patient Treatment Status')
    }

  }


  
  

  async userUpdatePatientTreatmentStatus(userId: string, patientTreatmentStatusId: string, input: UserUpdatePatientTreatmentStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!patientTreatmentStatusId) {
        throw new BadRequestException('Patient Treatment Status Id is required')
      } else {

      const patientTreatmentStatusData = await this.checkPatientTreatmentStatusExist(input.name)

      if (patientTreatmentStatusData.length > 0) {
        if (patientTreatmentStatusData[0].id != patientTreatmentStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'PatientTreatmentStatus', 'Update', input)

    let patientTreatmentStatus = this.data.patientTreatmentStatus.update({
      where: { id: patientTreatmentStatusId },
      data: {
name: input.name, 

}
, include: {legalCases: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PatientTreatmentStatus', 'Update', patientTreatmentStatus)

    return patientTreatmentStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Patient Treatment Status')
    }
  }

  async userUpdatePatientTreatmentStatuses(userId: string, input: UserUpdatePatientTreatmentStatusesInput): Promise<UpdateResult> {
    const total = input.patientTreatmentStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.patientTreatmentStatuses) {
      const inputData = input.patientTreatmentStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const patientTreatmentStatusData = await this.checkPatientTreatmentStatusExist(inputData.name)

      if (patientTreatmentStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.patientTreatmentStatus.upsert({
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


  async userDeletePatientTreatmentStatus(userId: string, patientTreatmentStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!patientTreatmentStatusId) {
        throw new BadRequestException('Patient Treatment Status Id is required')
      } else {

        const legalCaseCount = await this.data.legalCase.count({ where: { patientTreatmentStatusId: patientTreatmentStatusId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }

        await this.data.logEvent(sendingUser, true, 'PatientTreatmentStatus', 'Delete', patientTreatmentStatusId)

        let patientTreatmentStatus = this.data.patientTreatmentStatus.delete({
          where: { id: patientTreatmentStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'PatientTreatmentStatus', 'Delete', patientTreatmentStatus)

        return patientTreatmentStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Patient Treatment Status')
    }
  }
}

