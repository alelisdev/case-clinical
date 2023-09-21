import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AppointmentInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  appointmentDateAndTime?: Date

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  checkedIn?: boolean

  @Field({ nullable: true }) 
  checkedInDateTime?: Date

  @Field({ nullable: true }) 
  medicalReportId?: string

  @Field({ nullable: true }) 
  billId?: string

  @Field({ nullable: true }) 
  imagingId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string

  @Field({ nullable: true }) 
  finalVisitApproved?: boolean

  @Field({ nullable: true }) 
  visitKindId?: string

  @Field({ nullable: true }) 
  duration?: number

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  appointmentStatusId?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  recurringEventId?: string

  @Field({ nullable: true }) 
  isFirstInstance?: boolean

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  start?: string

  @Field({ nullable: true }) 
  end?: string

  @Field({ nullable: true }) 
  allDay?: boolean

  @Field({ nullable: true }) 
  recurrence?: string



  @Field({ nullable: true }) 
  assignedToId?: string

  @Field({ nullable: true }) 
  medicalRecordStatusId?: string
}
