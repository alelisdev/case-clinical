import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class LeadInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  middleName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  address?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  dateOfLoss?: Date

  @Field({ nullable: true }) 
  dateOfRetention?: Date

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  priorRepresentation?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  driversLicenseId?: string

  @Field({ nullable: true }) 
  driversLicenseNumber?: string

  @Field({ nullable: true }) 
  driversLicenseState?: string

  @Field({ nullable: true }) 
  severeInjury?: boolean


  @Field({ nullable: true }) 
  emergencyContactId?: string

  @Field({ nullable: true }) 
  allowedToContactEmergencyContact?: boolean

  @Field({ nullable: true }) 
  policeReport?: boolean

  @Field({ nullable: true }) 
  policeReportAttachmentId?: string

  @Field({ nullable: true }) 
  phoneRecordingId?: string

  @Field({ nullable: true }) 
  leadStatusId?: string

  @Field({ nullable: true }) 
  leadSpecialistId?: string


  @Field({ nullable: true }) 
  leadSourceId?: string

  @Field({ nullable: true }) 
  submittedById?: string




  @Field({ nullable: true }) 
  legalCaseId?: string
}
