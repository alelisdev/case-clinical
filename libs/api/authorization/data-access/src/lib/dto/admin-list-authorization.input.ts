import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListAuthorizationInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  vendorId?: string  


  @Field({ nullable: true }) 
  authorizationCategoryId?: string  


  @Field({ nullable: true }) 
  authorizationTypeId?: string  


  @Field({ nullable: true }) 
  procedureId?: string  


}
