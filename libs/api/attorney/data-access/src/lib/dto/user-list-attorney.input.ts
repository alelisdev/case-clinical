import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListAttorneyInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  firmId?: string  


  @Field({ nullable: true }) 
  attorneyStatusId?: string  


  @Field({ nullable: true }) 
  attorneyTypeId?: string  


}
