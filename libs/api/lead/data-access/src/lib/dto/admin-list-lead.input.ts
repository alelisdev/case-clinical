import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListLeadInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  accidentTypeId?: string  


  @Field({ nullable: true }) 
  driversLicenseId?: string  


  @Field({ nullable: true }) 
  policeReportAttachmentId?: string  


  @Field({ nullable: true }) 
  phoneRecordingId?: string  


  @Field({ nullable: true }) 
  leadStatusId?: string  


  @Field({ nullable: true }) 
  leadSourceId?: string  


  @Field({ nullable: true }) 
  submittedById?: string  


}
