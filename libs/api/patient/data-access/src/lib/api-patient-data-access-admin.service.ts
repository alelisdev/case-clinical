
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePatientInput } from './dto/admin-create-patient.input'
import { AdminListPatientInput } from './dto/admin-list-patient.input'
import { AdminListEthnicityInput } from '@case-clinical/api/ethnicity/data-access'
import { AdminListGenderInput } from '@case-clinical/api/gender/data-access'
import { AdminListLanguageInput } from '@case-clinical/api/language/data-access'
import { AdminUpdatePatientInput } from './dto/admin-update-patient.input'

@Injectable()
export class ApiPatientDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPatients(adminId: string, input?: AdminListPatientInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.patient.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {ethnicity: true, gender: true, language: true}
    })
  }

  async adminCountPatients(adminId: string, input?: AdminListPatientInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.patient.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminPatient(adminId: string, patientId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.patient.findUnique({ where: { id: patientId } , include: {ethnicity: true, gender: true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true, users: true} })
  }

  async checkPatientExist(patientName: string) {
    try {
      return this.data.patient.findMany({ where: { name: patientName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePatient(adminId: string, input: AdminCreatePatientInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const patientData = await this.checkPatientExist(input.name)

      if (patientData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.patient.create({
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
                    }: undefined,name: input.name, 
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

    }
    , include: {ethnicity: true, gender: true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true, users: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePatient(adminId: string, patientId, input: AdminUpdatePatientInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patient.update({
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
                    }: undefined,name: input.name, 
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

}
, include: {ethnicity: true, gender: true, language: true, appointments: true, claims: true, documents: true, legalCases: true, patientStudies: true, prescriptions: true, priorAuthorizationRequests: true, users: true} 
    })
  }

  async adminDeletePatient(adminId: string, patientId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.patient.delete({ where: { id: patientId } })
  }
}

