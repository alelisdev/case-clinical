import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateMedicalRecordInput } from './dto/user-create-medical-record.input'
import { UserListMedicalRecordInput } from './dto/user-list-medical-record.input'
import { UserUpdateMedicalRecordInput } from './dto/user-update-medical-record.input'
import { UserUpdateMedicalRecordsInput } from './dto/user-update-medical-records.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiMedicalRecordDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userMedicalRecords(userId: string, input?: UserListMedicalRecordInput) {
    if (!input) input = {}
    const user = await this.data.user.findUnique({ where: { id: userId } })
    if (user.patientId) input.patientId = user.patientId
    const name = input?.name ? input.name : undefined
    const dateFilter = this.data.parseDateFilter(input.dateFilter)

    console.log('dateFilter', dateFilter);
    return this.data.medicalRecord.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            patientId: input?.patientId,
            clinicalProviderId: input?.clinicalProviderId,
            createdAt: dateFilter ? dateFilter : undefined,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      orderBy: { createdAt:'desc'},
      include: {
        clinicalProvider: {  
          include: { 
            clinicalProviderSpecialties: { include: { specialty: true } } , 
            profileImage: true
          } 
        },
        document: true,
        patient: true,
      },
    })
  }

  async userSelectMedicalRecords(userId: string, input?: UserListMedicalRecordInput) {
    if (!input) input = {}
    const user = await this.data.user.findUnique({ where: { id: userId } })
    if (user.patientId) input.patientId = user.patientId
    const name = input?.name ? input.name : undefined

    return this.data.medicalRecord.findMany({
      where: {
        AND: [
          {
            name: { contains: name },
            patientId: input?.patientId,
            clinicalProviderId: input?.clinicalProviderId,
          },
        ],
      },
      select: {
        id: true,
        name: true,
      },
      take: input?.limit,
      skip: input?.skip,
    })
  }

  async userCountMedicalRecords(userId: string, input?: UserListMedicalRecordInput): Promise<CorePaging> {
    const user = await this.data.user.findUnique({ where: { id: userId } })
    if (user.patientId) input.patientId = user.patientId
    const name = input?.name ? input.name : undefined
    const dateFilter = this.data.parseDateFilter(input.dateFilter)

    const total = await this.data.medicalRecord.count({
      where: {
        AND: [
          {
            name: { contains: name },
            patientId: input?.patientId,
            clinicalProviderId: input?.clinicalProviderId,
            createdAt: dateFilter ? dateFilter : undefined,
          },
        ],
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userMedicalRecord(userId: string, medicalRecordId) {
    const medicalRecord = await this.data.medicalRecord.findUnique({
      where: { id: medicalRecordId },
      include: { clinicalProvider: true, patient: true, document: true },
    })
    if (medicalRecord.documentId)
      medicalRecord.document = await this.data.userDocument(userId, medicalRecord.documentId)
    return medicalRecord
  }

  async checkMedicalRecordExist(medicalRecordName: string) {
    try {
      return this.data.medicalRecord.findMany({ where: { name: medicalRecordName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateMedicalRecord(userId: string, input: UserCreateMedicalRecordInput) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })
    if (sendingUser.patientId) input.patientId = sendingUser.patientId
    try {
      const medicalRecordData = await this.checkMedicalRecordExist(input.name)

      if (medicalRecordData.length > 0) {
        throw new ConflictException('Record must be unique.')
      }

      if (input.document) {
        const documentId = (await this.data.userCreateDocument(userId, input.document)).id
        if (documentId) {
          input.documentId = documentId
        }
      }

      await this.data.logEvent(sendingUser, true, 'MedicalRecord', 'Create', input)

      const medicalRecord = await this.data.medicalRecord.create({
        data: {
          document: input.documentId
            ? {
                connect: {
                  id: input.documentId,
                },
              }
            : undefined,
          patient:
            input.patientId != null
              ? {
                  connect: {
                    id: input.patientId,
                  },
                }
              : undefined,

          clinicalProvider:
            input.clinicalProviderId != null
              ? {
                  connect: {
                    id: input.clinicalProviderId,
                  },
                }
              : undefined,
          name: input.name,
          description: input.description,
        },
        include: {
          clinicalProvider: {  
            include: { 
              clinicalProviderSpecialties: { include: { specialty: true } } , 
              profileImage: true
            } 
          },
          document: true,
          patient: true,
        },
      })

      await this.data.logEvent(sendingUser, false, 'MedicalRecord', 'Create', medicalRecord)

      return medicalRecord
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Medical Record')
    }
  }

  async userUpdateMedicalRecord(userId: string, medicalRecordId: string, input: UserUpdateMedicalRecordInput) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!medicalRecordId) {
        throw new BadRequestException('Medical Record Id is required')
      } else {
        const medicalRecordData = await this.checkMedicalRecordExist(input.name)

        if (medicalRecordData.length > 0) {
          if (medicalRecordData[0].id != medicalRecordId) {
            throw new ConflictException('Record must be unique.')
          }
        }

        await this.data.logEvent(sendingUser, true, 'MedicalRecord', 'Update', input)

        const medicalRecord = this.data.medicalRecord.update({
          where: { id: medicalRecordId },
          data: {
            clinicalProvider:
              input.clinicalProviderId != null
                ? {
                    connect: {
                      id: input.clinicalProviderId,
                    },
                  }
                : undefined,
            name: input.name,
            description: input.description,
          },
          include: { clinicalProvider: true },
        })

        await this.data.logEvent(sendingUser, false, 'MedicalRecord', 'Update', medicalRecord)

        return medicalRecord
      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Medical Record')
    }
  }

  async userUpdateMedicalRecords(userId: string, input: UserUpdateMedicalRecordsInput): Promise<UpdateResult> {
    const total = input.medicalRecords.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.medicalRecords) {
      const inputData = input.medicalRecords[key]

      const data = {
        id: inputData.id,
        name: inputData.name,
        description: inputData.description,
        clinicalProviderId: inputData.clinicalProviderId,
      }

      const medicalRecordData = await this.checkMedicalRecordExist(inputData.name)

      if (medicalRecordData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.medicalRecord.upsert({
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

  async userDeleteMedicalRecord(userId: string, medicalRecordId: string) {
    const sendingUser = await this.data.user.findFirst({ where: { id: userId } })

    try {
      if (!medicalRecordId) {
        throw new BadRequestException('Medical Record Id is required')
      } else {
        await this.data.logEvent(sendingUser, true, 'MedicalRecord', 'Delete', medicalRecordId)

        const medicalRecord = this.data.medicalRecord.delete({
          where: { id: medicalRecordId },
        })

        await this.data.logEvent(sendingUser, false, 'MedicalRecord', 'Delete', medicalRecord)

        return medicalRecord
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }
      throw new InternalServerErrorException('Error in deleting Medical Record')
    }
  }
}
