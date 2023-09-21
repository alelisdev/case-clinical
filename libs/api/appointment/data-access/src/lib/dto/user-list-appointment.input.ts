import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput, DateFilterInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListAppointmentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  locationId?: string  
  @Field({ nullable: true })
  attorneyId?: string

  @Field({ nullable: true }) 
  miscellaneousId?: string  

  @Field({ nullable: true })
  firmId?: string


  @Field({ nullable: true }) 
  medicalReportId?: string  


  @Field({ nullable: true }) 
  billId?: string  


  @Field({ nullable: true }) 
  imagingId?: string  


  @Field({ nullable: true }) 
  patientId?: string  


  @Field({ nullable: true }) 
  clinicalProviderId?: string  


  @Field({ nullable: true }) 
  legalCaseId?: string  


  @Field({ nullable: true }) 
  appointmentStatusId?: string

  @Field(() => DateFilterInput, { nullable: true})
  dateFilter?: DateFilterInput

  @Field({ nullable: true })
  visitKindId?: string
  
  @Field({ nullable: true }) 
  assignedToId?: string  


  @Field({ nullable: true }) 
  medicalRecordStatusId?: string  

  @Field(() => [String], { nullable: true })
  medicalRecordStatusOptions?: string[]

}
