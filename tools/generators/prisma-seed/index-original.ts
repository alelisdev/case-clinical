import { Tree } from '@nrwl/devkit'
import { Seeder } from './lib/seeder'
import {
  // compactNavigation,
  // defaultNavigation,
  // futuristicNavigation,
  dashboardNavigations,
  queuesNavigation,
  messages,
  notifications,
  //accidentKinds, clientWas, policyLimits,
  users,
  appNavigations,
  userCalendars,
  appointment,
  settingsNavigation,
  firms,
  academyCategories,
  accidentTypes,
  accountStatuses,
  adverseInsuranceStatuses,
  agreementTypes,
  appointments,
  appointmentStatuses,
  //assignedDocuments,
  //attorneies,
  attorneyStatuses,
  attorneyTypes,
  calculationBasisTypes,
  //calendars,
  //calendarTypes,
  //calendarWeekdaies,
  //caseAccounts,
  //casePreAccidents,
  //casePreInjuries,
  //casePreProblems,
  //casePreProcedures,
  //caseProcedures,
  caseProgressStatuses,
  caseStatuses,
  //caseTypes,
  //chats,
  //claimProcedures,
  //claims,
  claimStatuses,
  //contacts,
  //contractedRateKinds,
  //contractedRates,
  contractKinds,
  //contracts,
  //contractTerms,
  //courses,
  //documents,
  documentTypes,
  //emails,
  //facilityFeeSchedules,
  //feeSchedules,
  //firmStatuses,
  genders,
  //healthInsurances,
  //insurances,
  insuranceSectors,
  insuranceTypes,
  languages,
  //legalCases,
  //locations,
  medLevels,
  //navigations,
  organizations,
  //patients,
  //patientStudies,
  patientTreatmentStatuses,
  placeOfServices,
  //portfolios,
  //prescriptions,
  //priorMedsToDates,
  priorMedsToDateStatuses,
  procedureTypes,
  //procedureVendors,
  processes,
  reconciliationPeriodTypes,
  //requiredFields,
  roles,
  //settings,
  //shortcuts,
  specialties,
  tags,
  //taskItems,
  //taskTags,
  //teamRoles,
  //teams,
  //teamUsers,
  //templates,
  //timeEntries,
  //userCourseProgresses,
  //userRoles,
  //vendors,
  vendorTypes,
  //writeOffs,
  writeOffStatuses,
  // casePhases,
  // policyLimits,
  //yesNoUnknowns
} from './sample-data'
import { Schema } from './schema'
import * as fs from 'fs'
import * as path from 'path'

import * as Mockaroo from 'mockaroo'
import { Prisma } from '@prisma/client'
import { createPatient } from './lib/helpers'

var client = new Mockaroo.Client({
  apiKey: '18dc8c70', // see http://mockaroo.com/api/docs to get your api key
})

export async function generatePatients(): Promise<any[]> {
  await client
    .generate({
      count: 10,
      fields: [
        {
          name: 'id',
          null_percentage: 0,
          type: 'GUID',
          formula: null,
        },
        {
          name: 'firstName',
          null_percentage: 0,
          type: 'First Name',
          formula: null,
        },
        {
          name: 'middleName',
          null_percentage: 50,
          type: 'First Name',
          formula: null,
        },
        {
          name: 'lastName',
          null_percentage: 0,
          type: 'Last Name',
          formula: null,
        },
        {
          name: 'name',
          null_percentage: 0,
          type: 'Formula',
          value: 'concat(firstName, " ", lastName)',
          formula: null,
        },
        {
          name: 'suffix',
          null_percentage: 90,
          type: 'Suffix',
          formula: null,
        },
        {
          name: 'nickname',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'height',
          null_percentage: 0,
          type: 'Custom List',
          values: [
            '"5ft 2in"',
            '"5ft 3in"',
            '"5ft 4in"',
            '"5ft 5in"',
            '"5ft 6in"',
            '"5ft 7in"',
            '"5ft 8in"',
            '"5ft 9in"',
            '"5ft 10in"',
            '"5ft 11in"',
            '"6ft"',
            '"6ft 1in"',
            '"6ft 2in"',
            '"6ft 3in"',
            '"6ft 4in"',
          ],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'weight',
          null_percentage: 0,
          type: 'Number',
          min: 110,
          max: 350,
          decimals: 0,
          formula: null,
        },
        {
          name: 'dateOfBirth',
          null_percentage: 0,
          type: 'Datetime',
          min: '01/01/1945',
          max: '04/11/2000',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'primaryPhoneNumber',
          null_percentage: 0,
          type: 'Phone',
          format: '###-###-####',
          formula: null,
        },
        {
          name: 'isPrimaryPhoneMobile',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'secondaryPhoneNumber',
          null_percentage: 0,
          type: 'Phone',
          format: '###-###-####',
          formula: null,
        },
        {
          name: 'isSecondaryPhoneMobile',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'memberRegistrationNumber',
          null_percentage: 0,
          type: 'Digit Sequence',
          format: 'PCH-@@@######@',
          formula: null,
        },
        {
          name: 'ethnicityId',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"White"', '"Black"', '"Hispanic"', '"Asian"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'requiresTranslator',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'socialSecurityNumber',
          null_percentage: 0,
          type: 'SSN',
          formula: null,
        },
        {
          name: 'honorific',
          null_percentage: 0,
          type: 'Title',
          formula: null,
        },
        {
          name: 'primaryEmailAddress',
          null_percentage: 0,
          type: 'Email Address',
          formula: null,
        },
        {
          name: 'primaryAddressLine1',
          null_percentage: 0,
          type: 'Street Address',
          formula: null,
        },
        {
          name: 'primaryAddressLine2',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'primaryAddressCity',
          null_percentage: 0,
          type: 'Dataset Column',
          dataset: 'Providers',
          column: 'city',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'primaryAddressStateOrProvince',
          null_percentage: 0,
          type: 'Dataset Column',
          dataset: 'Providers',
          column: 'state',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'primaryAddressPostalCode',
          null_percentage: 0,
          type: 'Dataset Column',
          dataset: 'Providers',
          column: 'postalCode',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'notes',
          null_percentage: 50,
          type: 'Sentences',
          min: 10,
          max: 120,
          formula: null,
        },
        {
          name: 'latitude',
          null_percentage: 0,
          type: 'Latitude',
          formula: null,
        },
        {
          name: 'longitude',
          null_percentage: 0,
          type: 'Longitude',
          formula: null,
        },
        {
          name: 'homePhoneNumber',
          null_percentage: 0,
          type: 'Phone',
          format: '###-###-####',
          formula: null,
        },
        {
          name: 'mobileNumber',
          null_percentage: 0,
          type: 'Phone',
          format: '###-###-####',
          formula: null,
        },
        {
          name: 'bmi',
          null_percentage: 0,
          type: 'Number',
          min: 18,
          max: 35,
          decimals: 1,
          formula: null,
        },
        {
          name: 'occupation',
          null_percentage: 0,
          type: 'Job Title',
          formula: null,
        },
        {
          name: 'legalCases',
          null_percentage: 0,
          type: 'JSON Array',
          minItems: 1,
          maxItems: 2,
          formula: null,
        },
        {
          name: 'legalCases.id',
          null_percentage: 0,
          type: 'GUID',
          formula: null,
        },
        {
          name: 'legalCases.dateOfLoss',
          null_percentage: 0,
          type: 'Datetime',
          min: '01/01/2021',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'legalCases.name',
          null_percentage: 0,
          type: 'Formula',
          value: 'concat("Patient: ",name, " DOL: ", dateOfLoss, " DOB: ", dateOfBirth)',
          formula: null,
        },
        {
          name: 'legalCases.caseStatusDate',
          null_percentage: 0,
          type: 'Datetime',
          min: '01/01/2022',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'legalCases.paralegal',
          null_percentage: 0,
          type: 'Full Name',
          formula: null,
        },
        {
          name: 'legalCases.paralegalContact',
          null_percentage: 0,
          type: 'Email Address',
          formula: null,
        },
        {
          name: 'legalCases.caseNoteSummary',
          null_percentage: 0,
          type: 'Sentences',
          min: 10,
          max: 120,
          formula: null,
        },
        {
          name: 'legalCases.policyLimit',
          null_percentage: 0,
          type: 'Custom List',
          values: ['15000', '25000', '50000', '100000', '250000', '500000', '1000000'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.attorneyFee',
          null_percentage: 0,
          type: 'Number',
          min: 20,
          max: 45,
          decimals: 0,
          formula: null,
        },
        {
          name: 'legalCases.referringPhysician',
          null_percentage: 0,
          type: 'Dataset Column',
          dataset: 'Providers',
          column: 'providerName',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'legalCases.noMoreTreatment',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.medpay',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.fileNumber',
          null_percentage: 0,
          type: 'Digit Sequence',
          format: '@@@######@',
          formula: 'upper(this)',
        },
        {
          name: 'legalCases.caseNumber',
          null_percentage: 0,
          type: 'NHS Number',
          formula: null,
        },
        {
          name: 'legalCases.accidentState',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"CA"', '"AZ"', '"NV"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.assignedTo',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Doris"', '"Tina"', '"Underwriting"', '"Scheduling"', '"Contracting"', '"Medical Records"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.attorneyPaid',
          null_percentage: 90,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.attorneySentDate',
          null_percentage: 90,
          type: 'Datetime',
          min: '01/01/2022',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'legalCases.writeOff',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.noMRI',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.noPT',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.noFirstAppointment',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.hot',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.documentsUploaded',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.attorneyReview',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.escalatedReview',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.inActive',
          null_percentage: 99,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.documentUploadedDate',
          null_percentage: 0,
          type: 'Datetime',
          min: '01/01/2022',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: 'if documentsUploaded == true then dateOfLoss\nelse nil end',
        },
        {
          name: 'legalCases.patientDischargedGatheringRecordsDate',
          null_percentage: 0,
          type: 'Datetime',
          min: '01/01/2022',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'legalCases.resubmitted',
          null_percentage: 99,
          type: 'Datetime',
          min: '01/01/2022',
          max: '04/11/2022',
          format: '%Y-%m-%d',
          formula: null,
        },
        {
          name: 'legalCases.firmCaseManager',
          null_percentage: 99,
          type: 'Dataset Column',
          dataset: 'Attorney',
          column: 'Attorney',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'legalCases.underwriting_timeSensitive',
          null_percentage: 99,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.underwriting_needsMoreInfo',
          null_percentage: 99,
          type: 'Custom List',
          values: ['0', '1', '2', '3'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.underwriting_billsAttached',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.underwriting_completedMedRecs',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.underwriting_balance',
          null_percentage: 0,
          type: 'Number',
          min: 0,
          max: 4500,
          decimals: 2,
          formula: null,
        },
        {
          name: 'legalCases.underwriting_signedLien',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.underwriting_procedureRequested',
          null_percentage: 0,
          type: 'Dataset Column',
          dataset: 'procedureRequest',
          column: 'Procedure Requested',
          selectionStyle: 'random',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_accidentTypeId',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"MVA"', '"DogBite"', '"PrimisesLiability"', '"ProductLiability"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_dateOfLoss',
          null_percentage: 0,
          type: 'Formula',
          value: 'dateOfLoss',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_accidentDescription',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_review',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_initialEvaluation',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Yes"', '"No"', '"Unknown"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_evaluation',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_evaluationAfterHowLong',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Same Day"', '"Within 7 Days"', '"Within 14 Days"', '"> 2 weeks"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_evaluatedIn',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Urgent Care"', '"Chiro"', '"Pain Management"', '"Primary Care Provider"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_complaints',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Head"', '"Neck"', '"Back"', '"Arm"', '"Leg"', '"Hand"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_previousHistory',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_gapInCare',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_gapInCareWhen',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_preExistingProblems',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_priorInjuries',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.accidentInformation_otherInjuriesSince',
          null_percentage: 0,
          type: 'Blank',
          formula: null,
        },
        {
          name: 'legalCases.motorVehicleAccident_mvaDriver',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.motorVehicleAccident_mvaPassenger',
          null_percentage: 0,
          type: 'Boolean',
          formula: null,
        },
        {
          name: 'legalCases.motorVehicleAccident_mvaVehicle',
          null_percentage: 0,
          type: 'Car Model',
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates',
          null_percentage: 0,
          type: 'JSON Array',
          minItems: 0,
          maxItems: 5,
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates.id',
          null_percentage: 0,
          type: 'GUID',
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates.status',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Attorney Estimate"', '"Unknown"', '"Known"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates.quantity',
          null_percentage: 0,
          type: 'Number',
          min: 1,
          max: 2,
          decimals: 0,
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates.amount',
          null_percentage: 0,
          type: 'Custom List',
          values: ['500.00', '1000.00', '1500.00'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
        {
          name: 'legalCases.priorMedsToDates.name',
          null_percentage: 0,
          type: 'Custom List',
          values: ['"Emergency Room"', '"Imaging"', '"Ambulance"'],
          selectionStyle: 'random',
          distribution: null,
          formula: null,
        },
      ],
    })
    .then(function (records) {
      console.log(records[0].name)
      return records
    })
    .catch(function (error) {
      if (error instanceof Mockaroo.errors.InvalidApiKeyError) {
        console.log('invalid api key')
      } else if (error instanceof Mockaroo.errors.UsageLimitExceededError) {
        console.log('usage limit exceeded')
      } else if (error instanceof Mockaroo.errors.ApiError) {
        console.log('api error: ' + error.message)
      } else {
        console.log('unknown error: ' + error)
      }
      return null
    })
  return []
}

export default async function (host: Tree, schema: Schema) {
  if (!schema.confirm) {
    console.warn(`Seeding database cancelled`)
    return
  }

  const seeder = new Seeder(schema)

  await seeder.createData('patient', await generatePatients())

  var obj = JSON.parse(fs.readFileSync('C:/Dev/case-clinical-2/dist/out-tsc/tools/generators/prisma-seed/patienttest.json', 'utf8')); 
  await seeder.createData('patient', createPatient(obj))
  
  //Clean up existing data
  await seeder.removeData([
   // These models to be listed in reversed order of dependency as Prisma doesn't support cascading deletes yet.
    //Give this issue a thumbs-up to vote for it: https://github.com/prisma/prisma/issues/4711
    'message',
    'navigation',
   'notification',
    'email',
    'user',
    'appointment',
    'userCalendar',
    'attorney',
    'firm',
    'accidentType',
    'accountStatus',
    'adverseInsuranceStatus',
    'agreementType',
    'appointment',
    'appointmentStatus',
    'assignedDocument',
    'attorney',
    'attorneyStatus',
    'attorneyType',
    'calculationBasisType',
    'calendar',
    'calendarType',
    'calendarWeekday',
    'caseAccount',
    'casePreAccident',
    'casePreInjury',
    'casePreProblem',
    'casePreProcedure',
    'caseProcedure',
    'caseProgressStatus',
   'caseStatus',
    'caseType',
    'chat',
    'claim',
    'claimProcedure',
    'claimStatus',
    'contact',
    'contract',
    'contractedRate',
    'contractedRateKind',
    'contractKind',
    'contractTerm',
    'course',
    'document',
    'documentType',
    'email',
    'facilityFeeSchedule',
    'feeSchedule',
    'firm',
    'firmStatus',
    'gender',
    'healthInsurance',
    'insurance',
    'insuranceSector',
    'insuranceType',
    'language',
    'legalCase',
    'location',
    'medLevel',
    'message',
    'navigation',
    'notification',
    'organization',
    'patient',
    'patientStudy',
    'patientTreatmentStatus',
    'placeOfService',
    'portfolio',
    'prescription',
    'priorMedsToDate',
    'priorMedsToDateStatus',
    'procedureType',
    'procedureVendor',
    'process',
    'reconciliationPeriodType',
    'requiredField',
    'role',
    'setting',
    'shortcut',
    'specialty',
    'tag',
    'taskItem',
    'taskTag',
    'team',
    'teamRole',
    'teamUser',
    'template',
    'timeEntry',
    'user',
    'userCalendar',
    'userCourseProgress',
    'userRole',
    'vendor',
    'vendorType',
    'writeOff',
   'writeOffStatus',
  ])

  // // // Create users
  await seeder.createData('user', users)
  await seeder.createData('message', messages)
  await seeder.createData('notification', notifications)
  await seeder.createData('navigation', dashboardNavigations, { children: true, user: true, parent: true })
  await seeder.createData('navigation', appNavigations, { children: true, user: true, parent: true })

  await seeder.createData('navigation', queuesNavigation, { children: true, user: true, parent: true })
  await seeder.createData('navigation', settingsNavigation, { children: true, user: true, parent: true })

  await seeder.createData('appointment', [appointment])
  await seeder.createData('userCalendar', userCalendars, { calendar: true })

  await seeder.createData('firm', firms, { attorneys: true })

  await seeder.createData('academyCategory', academyCategories)
  await seeder.createData('accidentType', accidentTypes)
  await seeder.createData('accountStatus', accountStatuses)
  await seeder.createData('adverseInsuranceStatus', adverseInsuranceStatuses)
  await seeder.createData('agreementType', agreementTypes)
  await seeder.createData('appointment', appointments)
  await seeder.createData('appointmentStatus', appointmentStatuses)
  //await seeder.createData('assignedDocument', assignedDocuments)
  //await seeder.createData('attorney', attor)
  await seeder.createData('attorneyStatus', attorneyStatuses)
  await seeder.createData('attorneyType', attorneyTypes)
  //await seeder.createData('calculationBasisType', calculationBasisTypes)
  //await seeder.createData('calendar', calendars)
  //await seeder.createData('calendarType', calendarTypes)
  //await seeder.createData('calendarWeekday', calendarWeekdaies)
  //await seeder.createData('caseAccount', caseAccounts)
  //await seeder.createData('casePreAccident', casePreAccidents)
  //await seeder.createData('casePreInjury', casePreInjuries)
  //await seeder.createData('casePreProblem', casePreProblems)
  //await seeder.createData('casePreProcedure', casePreProcedures)
  //await seeder.createData('caseProcedure', caseProcedures)
  await seeder.createData('caseProgressStatus', caseProgressStatuses)
  await seeder.createData('caseStatus', caseStatuses)
  //await seeder.createData('caseType', caseTypes)
  //await seeder.createData('chat', chats)
  //await seeder.createData('claim', claims)
  //await seeder.createData('claimProcedure', claimProcedures)
  await seeder.createData('claimStatus', claimStatuses)
  //await seeder.createData('contact', contacts)
  //await seeder.createData('contract', contracts)
  //await seeder.createData('contractedRate', contractedRates)
  //await seeder.createData('contractedRateKind', contractedRateKinds)
  await seeder.createData('contractKind', contractKinds)
  //await seeder.createData('contractTerm', contractTerms)
  //await seeder.createData('course', courses)
  //await seeder.createData('document', documents)
  await seeder.createData('documentType', documentTypes)
  //await seeder.createData('email', emails)
  //await seeder.createData('facilityFeeSchedule', facilityFeeSchedules)
  //await seeder.createData('feeSchedule', feeSchedules)
  await seeder.createData('firm', firms)
  //await seeder.createData('firmStatus', firmStatuses)
  await seeder.createData('gender', genders)
  //await seeder.createData('healthInsurance', healthInsurances)
  //await seeder.createData('insurance', insurances)
  await seeder.createData('insuranceSector', insuranceSectors)
  await seeder.createData('insuranceType', insuranceTypes)
  await seeder.createData('language', languages)
  //await seeder.createData('legalCase', legalCases)
  //await seeder.createData('location', locations)
  await seeder.createData('medLevel', medLevels)
  await seeder.createData('message', messages)
  //await seeder.createData('navigation', navigations)
  await seeder.createData('notification', notifications)
  await seeder.createData('organization', organizations)
  //await seeder.createData('patient', patients)
  //await seeder.createData('patientStudy', patientStudies)
  await seeder.createData('patientTreatmentStatus', patientTreatmentStatuses)
  await seeder.createData('placeOfService', placeOfServices)
  //await seeder.createData('portfolio', portfolios)
  //await seeder.createData('prescription', prescriptions)
  //await seeder.createData('priorMedsToDate', priorMedsToDates)
  await seeder.createData('priorMedsToDateStatus', priorMedsToDateStatuses)
  await seeder.createData('procedureType', procedureTypes)
  //await seeder.createData('procedureVendor', procedureVendors)
  await seeder.createData('process', processes)
  await seeder.createData('reconciliationPeriodType', reconciliationPeriodTypes)
  //await seeder.createData('requiredField', requiredFields)
  //await seeder.createData('role', roles)
  //await seeder.createData('setting', settings)
  //await seeder.createData('shortcut', shortcuts)
  await seeder.createData('specialty', specialties)
  //await seeder.createData('tag', tags)
  //await seeder.createData('taskItem', taskItems)
  //await seeder.createData('taskTag', taskTags)
  //await seeder.createData('team', teams)
  //await seeder.createData('teamRole', teamRoles)
  //await seeder.createData('teamUser', teamUsers)
  //await seeder.createData('template', templates)
  //await seeder.createData('timeEntry', timeEntries)
  //await seeder.createData('userCourseProgress', userCourseProgresses)
  //await seeder.createData('vendor', vendors)
  await seeder.createData('vendorType', vendorTypes)
  //await seeder.createData('writeOff', writeOffs)
  await seeder.createData('writeOffStatus', writeOffStatuses)
}
