
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePatientInput } from './dto/user-create-patient.input'
import { UserListPatientInput } from './dto/user-list-patient.input'
import { UserUpdatePatientInput } from './dto/user-update-patient.input'
import { UserUpdatePatientsInput } from './dto/user-update-patients.input'

import { UserListEthnicityInput } from '@case-clinical/api/ethnicity/data-access'
import { UserListGenderInput } from '@case-clinical/api/gender/data-access'
import { UserListLanguageInput } from '@case-clinical/api/language/data-access'

@Injectable()
export class ApiPatientDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPatients(userId: string, input?: UserListPatientInput) {
    console.log(input)
    const user = await this.data.user.findUnique({ where: { id: userId } })
    let clinicalProviderIds = undefined

    if(user.vendorId && !input.isAllPatients) {
      if(input.clinicalProviderId === "" || !input.clinicalProviderId)
        clinicalProviderIds = (await this.data.clinicalProvider.findMany({where: {vendorId: user.vendorId}})).flatMap((provider) => provider.id)
      else clinicalProviderIds = [ input.clinicalProviderId ]
    }

    const name = input?.name ? input.name : undefined
    const vendorLocationId = input?.vendorLocationId ? input.vendorLocationId : undefined

    const fromDate = input?.fromDate ? input.fromDate : undefined
    const toDate = input?.toDate ? input.toDate : undefined

    return this.data.patient.findMany({
      where: {
            AND: [{
            name: { contains: name },
            appointments: !input.isAllPatients && user.vendorId ? {
              some: {
                clinicalProviderId: {
                  in: clinicalProviderIds
                },
                location:{
                  vendorLocationId:user.vendorId?vendorLocationId:undefined
                }
              }
            } : undefined,
            legalCases: input.medicalRecordNumber ? {
              some: {
                medicalRecordNumber: { contains: input.medicalRecordNumber }
              }
            } : undefined,
            dateOfBirth : {
              gte: fromDate,
              lte: toDate,
            },
            ethnicityId: input?.ethnicityId,
            subpoenaId: input?.subpoenaId,
genderId: input?.genderId,
languageId: input?.languageId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {users: true, ethnicity: true, gender: true, language: true, legalCases:true, subpoena:true}
    })
  }

  async userSelectPatients(userId: string, input?: UserListPatientInput) {
    const user = await this.data.user.findUnique({ where: { id: userId } })

    let clinicalProviderIds = undefined

    if(user.vendorId) {
      clinicalProviderIds = (await this.data.clinicalProvider.findMany({where: {vendorId: user.vendorId}})).flatMap((provider) => provider.id)
    }

    const name = input?.name ? input.name : undefined
    const vendorLocationId = input?.vendorLocationId ? input.vendorLocationId : undefined

    const fromDate = input?.fromDate ? input.fromDate : undefined
    const toDate = input?.toDate ? input.toDate : undefined
    return this.data.patient.findMany({
      where: {
            AND: [{
              name: { contains: name },
              appointments: !input.isAllPatients && user.vendorId ? {
                some: {
                  clinicalProviderId: {
                    in: clinicalProviderIds
                  },
                  location:{
                    vendorLocationId:user.vendorId?vendorLocationId:undefined
                  }
                }
              } : undefined,
              legalCases: input.medicalRecordNumber ? {
                some: {
                  medicalRecordNumber: { contains: input.medicalRecordNumber }
                }
              } : undefined,
              dateOfBirth : {
                gte: fromDate,
                lte: toDate,
              },
              ethnicityId: input?.ethnicityId,
              subpoenaId: input?.subpoenaId,
  genderId: input?.genderId,
  languageId: input?.languageId,}]
            },
        take: input?.limit,
        skip: input?.skip , 
    })
  }

  async userCountPatients(userId: string, input?: UserListPatientInput): Promise<CorePaging> {
    console.log(input)
    const user = await this.data.user.findUnique({ where: { id: userId } })
    let clinicalProviderIds = undefined

    if(user.vendorId && !input.isAllPatients) {
      if(input.clinicalProviderId === "" || !input.clinicalProviderId)
        clinicalProviderIds = (await this.data.clinicalProvider.findMany({where: {vendorId: user.vendorId}})).flatMap((provider) => provider.id)
      else clinicalProviderIds = [ input.clinicalProviderId ]
    }

    const name = input?.name ? input.name : undefined
    const vendorLocationId = input?.vendorLocationId ? input.vendorLocationId : undefined

    const fromDate = input?.fromDate ? input.fromDate : undefined
    const toDate = input?.toDate ? input.toDate : undefined

    const total = await this.data.patient.count(
    {
      where: {
        AND: [{
          name: { contains: name },
          appointments: !input.isAllPatients && user.vendorId ? {
            some: {
              clinicalProviderId: {
                in: clinicalProviderIds
              },
              location:{
                vendorLocationId:user.vendorId?vendorLocationId:undefined
              }
            }
          } : undefined,
          legalCases: input.medicalRecordNumber ? {
            some: {
              medicalRecordNumber: { contains: input.medicalRecordNumber }
            }
          } : undefined,
          dateOfBirth : {
            gte: fromDate,
            lte: toDate,
          },
          ethnicityId: input?.ethnicityId,
          subpoenaId: input?.subpoenaId,
genderId: input?.genderId,
languageId: input?.languageId,}]
      },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPatient(userId: string, patientId) {
    try {
      const patient = await this.data.patient.findUnique({ where: { id: patientId } ,
        include: {
          users: true,
          ethnicity: true,
          gender: true,
          language: true,
          subpoena:true,
          appointments: {include: { location: true, patient: true, clinicalProvider: {include:{clinicalProviderSpecialties:true}}, legalCase: true, appointmentStatus: true }},
          claims: {include: {priorAuthorizationRequest: true, patient: true}}, documents: true,
          legalCases: { include: {accidentType: true, propertyDamages: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true,
            patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}},
            patientStudies: {include: {patient: true, documents: true}},
            prescriptions: {include: {patient: true, document: true}},
            priorAuthorizationRequests: {include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true,
              guidelineUsed: true, authorizationKind: true, authorizationStatus: true,  patient: true}}}  })
    if (patient.subpoenaId) patient.subpoena = await this.data.userDocument(userId, patient.subpoenaId)
      return patient;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error, 'Error while fetching data.')
    }
 }

  async checkPatientExist(patientName: string) {
    try {
      return this.data.patient.findMany({ where: { name: patientName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePatient(userId: string, input: UserCreatePatientInput) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const patientData = await this.checkPatientExist(input.name)

        if (patientData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }

        if (input.subpoena) {
          const subpoenaId = (await this.data.userCreateDocument(userId, input.subpoena)).id
          if (subpoenaId) {
            input.subpoenaId = subpoenaId
          }
        }

    await this.data.logEvent(sendingUser, true, 'Patient', 'Create', input)

    const patient = await this.data.patient.create({
      data: {

                ethnicity:
                input.ethnicityId != null
                ? {
                        connect:  {
                            id: input.ethnicityId
                        }
                    }: undefined,
                gender:
                input.genderId != null
                ? {
                        connect:  {
                            id: input.genderId
                        }
                    }: undefined,
                language:
                input.languageId != null
                ? {
                        connect:  {
                            id: input.languageId
                        }
                    }: undefined,subpoena:
                    input.subpoenaId != null
                      ? {
                        connect: {
                          id: input.subpoenaId,
                        },
                      }
                      : undefined,name: input.name,
firstName: input.firstName,
middleName: input.middleName,
lastName: input.lastName,
suffix: input.suffix,
nickname: input.nickname,
height: input.height,
weight: input.weight,
dateOfBirth: input.dateOfBirth,
primaryPhoneNumber: input.primaryPhoneNumber,
isPrimaryPhoneMobile: input.isPrimaryPhoneMobile,
secondaryPhoneNumber: input.secondaryPhoneNumber,
isSecondaryPhoneMobile: input.isSecondaryPhoneMobile,
memberRegistrationNumber: input.memberRegistrationNumber,
requiresTranslator: input.requiresTranslator,
socialSecurityNumber: input.socialSecurityNumber,
honorific: input.honorific,
primaryEmailAddress: input.primaryEmailAddress,
primaryAddressLine1: input.primaryAddressLine1,
primaryAddressLine2: input.primaryAddressLine2,
primaryAddressCity: input.primaryAddressCity,
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince,
primaryAddressPostalCode: input.primaryAddressPostalCode,
workAddressLine1: input.workAddressLine1,
workAddressLine2: input.workAddressLine2,
workAddressCity: input.workAddressCity,
workAddressStateOrProvince: input.workAddressStateOrProvince,
workAddressPostalCode: input.workAddressPostalCode,
notes: input.notes,
latitude: input.latitude,
longitude: input.longitude,
workLatitude: input.workLatitude,
workLongitude: input.workLongitude,
homePhoneNumber: input.homePhoneNumber,
mobileNumber: input.mobileNumber,
bmi: input.bmi,
occupation: input.occupation,
debtorRemarks: input.debtorRemarks,
workAddress:input.workAddress,
homeAddress:input.homeAddress
}
, include: {ethnicity: true, gender: true, subpoena:true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true}
    })

    await this.data.logEvent(sendingUser, false, 'Patient', 'Create', patient)

    return patient

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Patient')
    }

  }





  async userUpdatePatient(userId: string, patientId: string, input: UserUpdatePatientInput) {

    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!patientId) {
        throw new BadRequestException('Patient Id is required')
      } else {

      const patientData = await this.checkPatientExist(input.name)

      if (patientData.length > 0) {
        if (patientData[0].id != patientId) {
          throw new ConflictException("Record must be unique.")
        }
      }

      if (input.subpoena) {
        const subpoenaId = (await this.data.userCreateDocument(userId, input.subpoena)).id
        if (subpoenaId) {
          input.subpoenaId = subpoenaId
        }
      }

    await this.data.logEvent(sendingUser, true, 'Patient', 'Update', input)

    const patient = this.data.patient.update({
      where: { id: patientId },
      data: {

                ethnicity:
                input.ethnicityId != null
                ? {
                        connect:  {
                            id: input.ethnicityId
                        }
                    }: undefined,
                gender:
                input.genderId != null
                ? {
                        connect:  {
                            id: input.genderId
                        }
                    }: undefined,
                language:
                input.languageId != null
                ? {
                        connect:  {
                            id: input.languageId
                        }
                    }: undefined,
              subpoena:
              input.subpoenaId != null
                ? {
                  connect: {
                    id: input.subpoenaId,
                  },
                }
                : undefined,name: input.name,
firstName: input.firstName,
middleName: input.middleName,
lastName: input.lastName,
suffix: input.suffix,
nickname: input.nickname,
height: input.height,
weight: input.weight,
dateOfBirth: input.dateOfBirth,
primaryPhoneNumber: input.primaryPhoneNumber,
isPrimaryPhoneMobile: input.isPrimaryPhoneMobile,
secondaryPhoneNumber: input.secondaryPhoneNumber,
isSecondaryPhoneMobile: input.isSecondaryPhoneMobile,
memberRegistrationNumber: input.memberRegistrationNumber,
requiresTranslator: input.requiresTranslator,
socialSecurityNumber: input.socialSecurityNumber,
honorific: input.honorific,
primaryEmailAddress: input.primaryEmailAddress,
primaryAddressLine1: input.primaryAddressLine1,
primaryAddressLine2: input.primaryAddressLine2,
primaryAddressCity: input.primaryAddressCity,
primaryAddressStateOrProvince: input.primaryAddressStateOrProvince,
primaryAddressPostalCode: input.primaryAddressPostalCode,
workAddressLine1: input.workAddressLine1,
workAddressLine2: input.workAddressLine2,
workAddressCity: input.workAddressCity,
workAddressStateOrProvince: input.workAddressStateOrProvince,
workAddressPostalCode: input.workAddressPostalCode,
notes: input.notes,
latitude: input.latitude,
longitude: input.longitude,
workLatitude: input.workLatitude,
workLongitude: input.workLongitude,
homePhoneNumber: input.homePhoneNumber,
mobileNumber: input.mobileNumber,
bmi: input.bmi,
occupation: input.occupation,
debtorRemarks: input.debtorRemarks,
workAddress:input.workAddress,
homeAddress:input.homeAddress
}
, include: {ethnicity: true, subpoena:true,gender: true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true}
    })

    await this.data.logEvent(sendingUser, false, 'Patient', 'Update', patient)

    return patient

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Patient')
    }
  }

  async userUpdatePatients(userId: string, input: UserUpdatePatientsInput): Promise<UpdateResult> {
    const total = input.patients.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.patients) {
      const inputData = input.patients[key]

      const data = {
        id: inputData.id,
name: inputData.name,
firstName: inputData.firstName,
middleName: inputData.middleName,
lastName: inputData.lastName,
suffix: inputData.suffix,
genderId: inputData.genderId,
nickname: inputData.nickname,
height: inputData.height,
weight: inputData.weight,
dateOfBirth: inputData.dateOfBirth,
subpoenaId: inputData.subpoenaId,
primaryPhoneNumber: inputData.primaryPhoneNumber,
isPrimaryPhoneMobile: inputData.isPrimaryPhoneMobile,
secondaryPhoneNumber: inputData.secondaryPhoneNumber,
isSecondaryPhoneMobile: inputData.isSecondaryPhoneMobile,
memberRegistrationNumber: inputData.memberRegistrationNumber,
ethnicityId: inputData.ethnicityId,
languageId: inputData.languageId,
requiresTranslator: inputData.requiresTranslator,
socialSecurityNumber: inputData.socialSecurityNumber,
honorific: inputData.honorific,
primaryEmailAddress: inputData.primaryEmailAddress,
primaryAddressLine1: inputData.primaryAddressLine1,
primaryAddressLine2: inputData.primaryAddressLine2,
primaryAddressCity: inputData.primaryAddressCity,
primaryAddressStateOrProvince: inputData.primaryAddressStateOrProvince,
primaryAddressPostalCode: inputData.primaryAddressPostalCode,
workAddressLine1: inputData.workAddressLine1,
workAddressLine2: inputData.workAddressLine2,
workAddressCity: inputData.workAddressCity,
workAddressStateOrProvince: inputData.workAddressStateOrProvince,
workAddressPostalCode: inputData.workAddressPostalCode,
notes: inputData.notes,
latitude: inputData.latitude,
longitude: inputData.longitude,
workLatitude: inputData.workLatitude,
workLongitude: inputData.workLongitude,
emergencyContactId: inputData.emergencyContactId,
homePhoneNumber: inputData.homePhoneNumber,
mobileNumber: inputData.mobileNumber,
bmi: inputData.bmi,
occupation: inputData.occupation,
debtorRemarks: inputData.debtorRemarks,
workAddress:inputData.workAddress,
homeAddress:inputData.homeAddress
      }

      const patientData = await this.checkPatientExist(inputData.name)

      if (patientData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.patient.upsert({
            where: {id: inputData.id || ""},
              create: data,
              update: data,
              include:{ language: true, ethnicity: true, gender: true }
            })

            if(result.id === inputData.id)
              updated.push(result);
            else {
              created.push(result);
            }
          } catch (error) {
              failed.push(inputData);
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


  async userDeletePatient(userId: string, patientId: string) {
    const sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!patientId) {
        throw new BadRequestException('Patient Id is required')
      } else {


        const appointmentCount = await this.data.appointment.count({ where: { patientId: patientId }})
        if(appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }


        const claimCount = await this.data.claim.count({ where: { patientId: patientId }})
        if(claimCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim')
        }


        const documentCount = await this.data.document.count({ where: { patientId: patientId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }


        const legalCaseCount = await this.data.legalCase.count({ where: { patientId: patientId }})
        if(legalCaseCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Legal Case')
        }


        const patientStudyCount = await this.data.patientStudy.count({ where: { patientId: patientId }})
        if(patientStudyCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Patient Study')
        }


        const prescriptionCount = await this.data.prescription.count({ where: { patientId: patientId }})
        if(prescriptionCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prescription')
        }


        const priorAuthorizationRequestCount = await this.data.priorAuthorizationRequest.count({ where: { patientId: patientId }})
        if(priorAuthorizationRequestCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Request')
        }


        const userCount = await this.data.user.count({ where: { patientId: patientId }})
        if(userCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an User')
        }


        await this.data.logEvent(sendingUser, true, 'Patient', 'Delete', patientId)

        const patient = this.data.patient.delete({
          where: { id: patientId }
        })

        await this.data.logEvent(sendingUser, false, 'Patient', 'Delete', patient)

        return patient

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Patient')
    }
  }
}

