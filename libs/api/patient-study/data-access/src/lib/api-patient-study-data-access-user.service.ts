
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePatientStudyInput } from './dto/user-create-patient-study.input'
import { UserListPatientStudyInput } from './dto/user-list-patient-study.input'
import { UserUpdatePatientStudyInput } from './dto/user-update-patient-study.input'
import { UserUpdatePatientStudiesInput } from './dto/user-update-patient-studies.input'

import { UserListPatientInput } from '@case-clinical/api/patient/data-access'

@Injectable()
export class ApiPatientStudyDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPatientStudies(userId: string, input?: UserListPatientStudyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientStudy.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {patient: true}
    })
  }

  async userSelectPatientStudies(userId: string, input?: UserListPatientStudyInput) {
    let name = input?.name ? input.name : undefined

    return this.data.patientStudy.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPatientStudies(userId: string, input?: UserListPatientStudyInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.patientStudy.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPatientStudy(userId: string, patientStudyId) {

    return this.data.patientStudy.findUnique({ where: { id: patientStudyId } , include: {patient: true, documents: true}  })
  }

  async checkPatientStudyExist(patientStudyName: string, patientId:string) {
    try {
      return this.data.patientStudy.findMany({ where: { name: patientStudyName, patientId:patientId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePatientStudy(userId: string, input: UserCreatePatientStudyInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {  

    await this.data.logEvent(sendingUser, true, 'PatientStudy', 'Create', input)

    let patientStudy = await this.data.patientStudy.create({
      data: { 
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 

}
, include: {patient: true, documents: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PatientStudy', 'Create', patientStudy)

    return patientStudy

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Patient Study')
    }

  }


  
  

  async userUpdatePatientStudy(userId: string, patientStudyId: string, input: UserUpdatePatientStudyInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!patientStudyId) {
        throw new BadRequestException('Patient Study Id is required')
      } else {



    await this.data.logEvent(sendingUser, true, 'PatientStudy', 'Update', input)

    let patientStudy = this.data.patientStudy.update({
      where: { id: patientStudyId },
      data: {
  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,name: input.name, 

}
, include: {patient: true, documents: true} 
    })

    await this.data.logEvent(sendingUser, false, 'PatientStudy', 'Update', patientStudy)

    return patientStudy

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Patient Study')
    }
  }

  async userUpdatePatientStudies(userId: string, input: UserUpdatePatientStudiesInput): Promise<UpdateResult> {
    const total = input.patientStudies.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.patientStudies) {
      const inputData = input.patientStudies[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
patientId: inputData.patientId, 

      }

      const patientStudyData = await this.checkPatientStudyExist(inputData.name, inputData.patientId)

      if (patientStudyData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.patientStudy.upsert({
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


  async userDeletePatientStudy(userId: string, patientStudyId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!patientStudyId) {
        throw new BadRequestException('Patient Study Id is required')
      } else {

        const documentCount = await this.data.document.count({ where: { patientStudyId: patientStudyId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }

        await this.data.logEvent(sendingUser, true, 'PatientStudy', 'Delete', patientStudyId)

        let patientStudy = this.data.patientStudy.delete({
          where: { id: patientStudyId }
        })

        await this.data.logEvent(sendingUser, false, 'PatientStudy', 'Delete', patientStudy)

        return patientStudy

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Patient Study')
    }
  }
}

