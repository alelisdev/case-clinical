import { Prisma, Role, User } from '@prisma/client'
import { StringDecoder } from 'string_decoder'
import * as moment from 'moment'
import { lstat } from 'fs'

export function createUser(id: string, username: string, email: string, password: string): Prisma.UserCreateInput {
  return {
    id,
    username,
    emails: { create: { email, primary: true } },
    password,
    avatarUrl: 'https://www.gravatar.com/avatar?d=mp',
  }
}

export function createRole(name: string): Prisma.RoleCreateInput {
  return {
    name,
  }
}

export function createPatient(data: any[]): Prisma.PatientCreateInput[] {
  let patients: Prisma.PatientCreateInput[] = []
  data.map((x) => {
    var patient: Prisma.PatientCreateInput = {
      id: x.id,
      name: x.name,
      bmi: x.bmi.toString(),
      dateOfBirth: moment(x.dateOfBirth, 'yyyy-mm-dd').toDate(),
      firstName: x.firstName,
      middleName: x.middleName,
      lastName: x.lastName,
      height: x.height.toString(),
      weight: x.weight.toString(),
      suffix: x.suffix,
      gender: x.genderId, //TODO
      primaryPhoneNumber: x.primaryPhoneNumber,
      primaryAddressLine1: x.primaryAddressLine1,
      primaryAddressCity: x.primaryAddressCity,
      primaryAddressStateOrProvince: x.primaryAddressStateOrProvince,
      primaryAddressPostalCode: x.primaryAddressPostalCode,
      primaryEmailAddress: x.primaryEmailAddress,
      isPrimaryPhoneMobile: x.isPrimaryPhoneMobile,
      isSecondaryPhoneMobile: x.isSecondaryPhoneMobile,
      secondaryPhoneNumber: x.secondaryPhoneNumber,
      memberRegistrationNumber: x.memberRegistrationNumber,
      requiresTranslator: x.requiresTranslator,
      socialSecurityNumber: x.socialSecurityNumber,
      homePhoneNumber: x.homePhoneNumber,
      honorific: x.honorific,
      latitude: x.latitude,
      longitude: x.longitude,
      notes: x.notes?.substring(0, 50),
      occupation: x.occupation,
      mobileNumber: x.mobileNumber,
      legalCases: {
        createMany: {
          data: x.legalCases.map( lc => {
            return {
              id: lc.id, 
              name: lc.name, 
              medLevelId: lc.medLevelId, 
              accidentTypeId: lc.accidentTypeId, 
              firmId: lc.firmId, 
              attorneyId: lc.attorneyId,
              agentId: lc.agentId, 
              caseStatusId: lc.caseStatusId, 
              dateOfLoss:  moment(lc.dateOfLoss, 'yyyy-mm-dd').toDate(),
              paralegal: lc.paralegal, 
              paralegalContact: lc.paralegalContact, 
              caseNoteSummary: lc.caseNoteSummary?.substring(0,50), 
              policyLimit: lc.policyLimit, 
              attorneyFee: lc.attorneyFee, 
              referringPhysician: lc.referringPhysician, 
              noMoreTreatment: lc.noMoreTreatment, 
              medpay: lc.medpay, 
              fileNumber: lc.fileNumber, 
              caseNumber: lc.caseNumber, 
              accidentState: lc.accidentState, 
              assignedTo: lc.assignedTo, 
              attorneyPaid: lc.attorneyPaid, 
              attorneySentDate: moment(lc.attorneySentDate, 'yyyy-mm-dd').toDate(),
              writeOff: lc.writeOff, 
              noMRI: lc.noMRI, 
              noPT: lc.noPT, 
              noFirstAppointment: lc.noFirstAppointment, 
              hot: lc.hot, 
              documentsUploaded: lc.documentsUploaded, 
              attorneyReview: lc.attorneyReview, 
              escalatedReview: lc.escalatedReview

            }
          })
        }
      },
    }
    patients.push(patient)
  })
  return patients
}

// export function createUserCalendars(id: string, name: string): Prisma.AccidentKindCreateInput {
//   return {
//     id,
//     name,
//   }
// }

// export function createLegalCasePhases(id: string, name: string): Prisma.LegalCasePhaseCreateInput {
//   return {
//     id,
//     name,
//   }
// }

// export function createAccidentKinds(id: string, name: string): Prisma.AccidentKindCreateInput {
//   return {
//     id,
//     name,
//   }
// }

// export function createYesNoUnknown(id: string, name: string): Prisma.YesNoUnknownCreateInput {
//   return {
//     id,
//     name,
//   }
// }

// // export function createClientWas(id: string, name: string): Prisma.ClientWasCreateInput {
// //   return {
// //     id,
// //     name,
// //   }
// // }

// export function createPolicyLimit(id: string, name: string): Prisma.PolicyLimitCreateInput {
//   return {
//     id,
//     name,
//   }
// }

export function createMessage(
  id: string,
  title: string,
  read: boolean,
  image: string,
  userId: string,
  description: string,
  time: Date,
): Prisma.MessageCreateInput {
  return {
    id,
    title,
    read,
    image,
    user: {
      connect: {
        id: userId,
      },
    },
    description,
    time,
  }
}
