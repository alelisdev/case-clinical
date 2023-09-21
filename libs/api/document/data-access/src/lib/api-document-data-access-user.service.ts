
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateDocumentInput } from './dto/user-create-document.input'
import { UserListDocumentInput } from './dto/user-list-document.input'
import { UserUpdateDocumentInput } from './dto/user-update-document.input'
import { UserUpdateDocumentsInput } from './dto/user-update-documents.input'

import { UserListContractInput } from '@case-clinical/api/contract/data-access'
import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListUserInput } from '@case-clinical/api/user/data-access'
import { UserListPatientStudyInput } from '@case-clinical/api/patient-study/data-access'
import { UserListProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { UserListMedicalConditionProviderInput } from '@case-clinical/api/medical-condition-provider/data-access'

@Injectable()
export class ApiDocumentDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userDocuments(userId: string, input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.document.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,
locationId: input.locationId,
miscellaneousId: input.miscellaneousId,
propertyDamageId: input.propertyDamageId}]
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true, location: true, miscellaneous:true}
    })
  }

  async userSelectDocuments(userId: string, input?: UserListDocumentInput) {
    let name = input?.name ? input.name : undefined

    return this.data.document.findMany({
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountDocuments(userId: string, input?: UserListDocumentInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.document.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            contractId: input.contractId,
patientId: input.patientId,
providerId: input.providerId,
patientStudyId: input.patientStudyId,
procedureVendorId: input.procedureVendorId,
medicalConditionProviderId: input.medicalConditionProviderId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userDocument(userId: string, documentId) {
    return this.data.userDocument(userId, documentId);
  }

  async checkDocumentExist(documentName: string) {
    try {
      return this.data.document.findMany({ where: { name: documentName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateDocument(userId: string, input: UserCreateDocumentInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        // const documentData = await this.checkDocumentExist(input.name)

        // if (documentData.length > 0) {
        //     throw new ConflictException("Record must be unique.")
        // }


      console.log('hit the wrong one')
   // await this.data.logEvent(sendingUser, true, 'Document', 'Create', input)

    let document = await this.data.document.create({
      data: {

                contract:
                input.contractId != null
                ? {
                        connect:  {
                            id: input.contractId
                        }
                    }: undefined,
                patient:
                input.patientId != null
                ? {
                        connect:  {
                            id: input.patientId
                        }
                    }: undefined,
                procedureVendor:
                input.procedureVendorId != null
                ? {
                        connect:  {
                            id: input.procedureVendorId
                        }
                    }: undefined,
                medicalConditionProvider:
                input.medicalConditionProviderId != null
                ? {
                        connect:  {
                            id: input.medicalConditionProviderId
                        }
                    }: undefined,name: input.name,
attachment: input.attachment,
encoding: input.encoding,
extension: input.extension,

}
, include: {contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true, assignedDocuments: true, eulas: true, prescriptions: true, bills: true, medicalReports: true}
    })

    await this.data.logEvent(sendingUser, false, 'Document', 'Create', document)

    return document

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Document Api try', error)
    }

  }





  async userUpdateDocument(userId: string, documentId: string, input: UserUpdateDocumentInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!documentId) {
        throw new BadRequestException('Document Id is required')
      } else {

      // const documentData = await this.checkDocumentExist(input.name)

      // if (documentData.length > 0) {
      //   if (documentData[0].id != documentId) {
      //     throw new ConflictException("Record must be unique.")
      //   }
      // }



    await this.data.logEvent(sendingUser, true, 'Document', 'Update', input)

    let document = this.data.document.update({
      where: { id: documentId },
      data: {

                contract:
                input.contractId != null
                ? {
                        connect:  {
                            id: input.contractId
                        }
                    }: undefined,
                patient:
                input.patientId != null
                ? {
                        connect:  {
                            id: input.patientId
                        }
                    }: undefined,
                procedureVendor:
                input.procedureVendorId != null
                ? {
                        connect:  {
                            id: input.procedureVendorId
                        }
                    }: undefined,
                medicalConditionProvider:
                input.medicalConditionProviderId != null
                ? {
                        connect:  {
                            id: input.medicalConditionProviderId
                        }
                    }: undefined,name: input.name,
attachment: input.attachment,
encoding: input.encoding,
extension: input.extension,

}
, include: {contract: true, patient: true, procedureVendor: true, medicalConditionProvider: true, assignedDocuments: true, eulas: true, prescriptions: true, bills: true, medicalReports: true}
    })

    await this.data.logEvent(sendingUser, false, 'Document', 'Update', document)

    return document

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Document')
    }
  }

  async userUpdateDocuments(userId: string, input: UserUpdateDocumentsInput): Promise<UpdateResult> {
    const total = input.documents.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.documents) {
      const inputData = input.documents[key]

      const data = {
        id: inputData.id,
name: inputData.name,
attachment: inputData.attachment,
encoding: inputData.encoding,
extension: inputData.extension,
contractId: inputData.contractId,
patientId: inputData.patientId,
providerId: inputData.providerId,
patientStudyId: inputData.patientStudyId,
procedureVendorId: inputData.procedureVendorId,
medicalConditionProviderId: inputData.medicalConditionProviderId,

      }

      // const documentData = await this.checkDocumentExist(inputData.name)

        try {
          const result = await this.data.document.upsert({
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

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteDocument(userId: string, documentId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!documentId) {
        throw new BadRequestException('Document Id is required')
      } else {

        await this.data.logEvent(sendingUser, true, 'Document', 'Delete', documentId)

        let document = this.data.document.delete({
          where: { id: documentId }
        })

        await this.data.logEvent(sendingUser, false, 'Document', 'Delete', document)

        return document

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Document')
    }
  }
}

