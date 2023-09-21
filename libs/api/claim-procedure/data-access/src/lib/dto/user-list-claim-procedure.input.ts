import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListClaimProcedureInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  placeOfServiceId?: string  


  @Field({ nullable: true }) 
  claimStatusId?: string  


  @Field({ nullable: true }) 
  claimId?: string  


  @Field({ nullable: true }) 
  appointmentId?: string  


  @Field({ nullable: true }) 
  procedureId?: string  


}
