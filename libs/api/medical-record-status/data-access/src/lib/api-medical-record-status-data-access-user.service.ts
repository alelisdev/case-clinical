
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateMedicalRecordStatusInput } from './dto/user-create-medical-record-status.input'
import { UserListMedicalRecordStatusInput } from './dto/user-list-medical-record-status.input'
import { UserUpdateMedicalRecordStatusInput } from './dto/user-update-medical-record-status.input'
import { UserUpdateMedicalRecordStatusesInput } from './dto/user-update-medical-record-statuses.input'



@Injectable()
export class ApiMedicalRecordStatusDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userMedicalRecordStatuses(userId: string, input?: UserListMedicalRecordStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecordStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async userSelectMedicalRecordStatuses(userId: string, input?: UserListMedicalRecordStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.medicalRecordStatus.findMany({
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

  async userCountMedicalRecordStatuses(userId: string, input?: UserListMedicalRecordStatusInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.medicalRecordStatus.count(
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

  async userMedicalRecordStatus(userId: string, medicalRecordStatusId) {

    return this.data.medicalRecordStatus.findUnique({ where: { id: medicalRecordStatusId } , include: {appointments: true}  })
  }

  async checkMedicalRecordStatusExist(medicalRecordStatusName: string) {
    try {
      return this.data.medicalRecordStatus.findMany({ where: { name: medicalRecordStatusName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateMedicalRecordStatus(userId: string, input: UserCreateMedicalRecordStatusInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const medicalRecordStatusData = await this.checkMedicalRecordStatusExist(input.name)

        if (medicalRecordStatusData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'MedicalRecordStatus', 'Create', input)

    let medicalRecordStatus = await this.data.medicalRecordStatus.create({
      data: { 
name: input.name, 

}
, include: {appointments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedicalRecordStatus', 'Create', medicalRecordStatus)

    return medicalRecordStatus

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Medical Record Status')
    }

  }


  
  

  async userUpdateMedicalRecordStatus(userId: string, medicalRecordStatusId: string, input: UserUpdateMedicalRecordStatusInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!medicalRecordStatusId) {
        throw new BadRequestException('Medical Record Status Id is required')
      } else {

      const medicalRecordStatusData = await this.checkMedicalRecordStatusExist(input.name)

      if (medicalRecordStatusData.length > 0) {
        if (medicalRecordStatusData[0].id != medicalRecordStatusId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'MedicalRecordStatus', 'Update', input)

    let medicalRecordStatus = this.data.medicalRecordStatus.update({
      where: { id: medicalRecordStatusId },
      data: {
name: input.name, 

}
, include: {appointments: true} 
    })

    await this.data.logEvent(sendingUser, false, 'MedicalRecordStatus', 'Update', medicalRecordStatus)

    return medicalRecordStatus

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Medical Record Status')
    }
  }

  async userUpdateMedicalRecordStatuses(userId: string, input: UserUpdateMedicalRecordStatusesInput): Promise<UpdateResult> {
    const total = input.medicalRecordStatuses.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.medicalRecordStatuses) {
      const inputData = input.medicalRecordStatuses[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 

      }

      const medicalRecordStatusData = await this.checkMedicalRecordStatusExist(inputData.name)

      if (medicalRecordStatusData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.medicalRecordStatus.upsert({
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


  async userDeleteMedicalRecordStatus(userId: string, medicalRecordStatusId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!medicalRecordStatusId) {
        throw new BadRequestException('Medical Record Status Id is required')
      } else {


        const appointmentCount = await this.data.appointment.count({ where: { medicalRecordStatusId: medicalRecordStatusId }})
        if(appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }


        await this.data.logEvent(sendingUser, true, 'MedicalRecordStatus', 'Delete', medicalRecordStatusId)

        let medicalRecordStatus = this.data.medicalRecordStatus.delete({
          where: { id: medicalRecordStatusId }
        })

        await this.data.logEvent(sendingUser, false, 'MedicalRecordStatus', 'Delete', medicalRecordStatus)

        return medicalRecordStatus

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Medical Record Status')
    }
  }
}

