
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePrescriptionInput } from './dto/user-create-prescription.input'
import { UserListPrescriptionInput } from './dto/user-list-prescription.input'
import { UserUpdatePrescriptionInput } from './dto/user-update-prescription.input'
import { UserUpdatePrescriptionsInput } from './dto/user-update-prescriptions.input'

import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'

@Injectable()
export class ApiPrescriptionDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPrescriptions(userId: string, input?: UserListPrescriptionInput) {
    if(!input) input = {};
    const user = await this.data.user.findUnique({ where: { id: userId } })

    if(user.patientId) input.patientId = user.patientId;
    let name = input?.name ? input.name : undefined

    return this.data.prescription.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,
            documentId: input?.documentId,}]
          },
      orderBy: { createdAt:'desc'},
      take: input?.limit,
      skip: input?.skip , include: {patient: true, document: true}
    })
  }

  async userSelectPrescriptions(userId: string, input?: UserListPrescriptionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.prescription.findMany({
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,
documentId: input?.documentId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPrescriptions(userId: string, input?: UserListPrescriptionInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.prescription.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            patientId: input?.patientId,
documentId: input?.documentId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPrescription(userId: string, prescriptionId) {

    return this.data.prescription.findUnique({ where: { id: prescriptionId } , include: {patient: true, document: true}  })
  }

  async checkPrescriptionExist(prescriptionName: string, patientId: string) {
    try {
      return this.data.prescription.findMany({ where: { name: prescriptionName, patientId:patientId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePrescription(userId: string, input: UserCreatePrescriptionInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    if(sendingUser.patientId) input.patientId = sendingUser.patientId;
    try {
        const prescriptionData = await this.checkPrescriptionExist(input.name, input.patientId)

        if (prescriptionData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }


    if(input.document){

      let documentId = (await this.data.userCreateDocument(userId, input.document)).id
      if(documentId){
        input.documentId = documentId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Prescription', 'Create', input)

    let prescription = await this.data.prescription.create({
      data: {

                patient:
                input.patientId != null
                ? {
                        connect:  {
                            id: input.patientId
                        }
                    }: undefined,
                document:
                input.documentId != null
                ? {
                        connect:  {
                            id: input.documentId
                        }
                    }: undefined,name: input.name,
medicalProvider: input.medicalProvider,
dateWritten: input.dateWritten,
days: input.days,
note: input.note,
category: input.category,
kind: input.kind,
quantity: input.quantity,
refills: input.refills,
rxNumber: input.rxNumber,
sig: input.sig,
strength: input.strength,
unit: input.unit,

}
, include: {patient: true, document: true}
    })

    await this.data.logEvent(sendingUser, false, 'Prescription', 'Create', prescription)

    return prescription

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prescription')
    }

  }





  async userUpdatePrescription(userId: string, prescriptionId: string, input: UserUpdatePrescriptionInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!prescriptionId) {
        throw new BadRequestException('Prescription Id is required')
      } else {

      const prescriptionData = await this.checkPrescriptionExist(input.name, input.patientId)

      if (prescriptionData.length > 0) {
        if (prescriptionData[0].id != prescriptionId) {
          throw new ConflictException("Record must be unique.")
        }
      }


    if(input.document){
      let documentId = (await this.data.userCreateDocument(userId, input.document)).id
      if(documentId){
        input.documentId = documentId
     }
    }


    await this.data.logEvent(sendingUser, true, 'Prescription', 'Update', input)

    let prescription = this.data.prescription.update({
      where: { id: prescriptionId },
      data: {

                patient:
                input.patientId != null
                ? {
                        connect:  {
                            id: input.patientId
                        }
                    }: undefined,
                document:
                input.documentId != null
                ? {
                        connect:  {
                            id: input.documentId
                        }
                    }: undefined,name: input.name,
medicalProvider: input.medicalProvider,
dateWritten: input.dateWritten,
days: input.days,
note: input.note,
category: input.category,
kind: input.kind,
quantity: input.quantity,
refills: input.refills,
rxNumber: input.rxNumber,
sig: input.sig,
strength: input.strength,
unit: input.unit,

}
, include: {patient: true, document: true}
    })

    await this.data.logEvent(sendingUser, false, 'Prescription', 'Update', prescription)

    return prescription

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prescription')
    }
  }

  async userUpdatePrescriptions(userId: string, input: UserUpdatePrescriptionsInput): Promise<UpdateResult> {
    const total = input.prescriptions.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.prescriptions) {
      const inputData = input.prescriptions[key]

      const data = {
        id: inputData.id,
name: inputData.name,
medicalProvider: inputData.medicalProvider,
dateWritten: inputData.dateWritten,
days: inputData.days,
note: inputData.note,
category: inputData.category,
kind: inputData.kind,
quantity: inputData.quantity,
refills: inputData.refills,
rxNumber: inputData.rxNumber,
sig: inputData.sig,
strength: inputData.strength,
unit: inputData.unit,
patientId: inputData.patientId,
documentId: inputData.documentId,

      }

      const prescriptionData = await this.checkPrescriptionExist(inputData.name, inputData.patientId)

      if (prescriptionData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.prescription.upsert({
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


  async userDeletePrescription(userId: string, prescriptionId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!prescriptionId) {
        throw new BadRequestException('Prescription Id is required')
      } else {


        await this.data.logEvent(sendingUser, true, 'Prescription', 'Delete', prescriptionId)

        let prescription = this.data.prescription.delete({
          where: { id: prescriptionId }
        })

        await this.data.logEvent(sendingUser, false, 'Prescription', 'Delete', prescription)

        return prescription

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Prescription')
    }
  }
}

