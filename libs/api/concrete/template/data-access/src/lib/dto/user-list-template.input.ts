import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListTemplateInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string




  @Field({ nullable: true }) 
  assignedDocumentId?: string  


  @Field({ nullable: true }) 
  lienId?: string  

}
