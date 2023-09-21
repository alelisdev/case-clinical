import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class UserListAssignedDocumentInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  documentId?: string  


  @Field({ nullable: true }) 
  templateId?: string  


  @Field({ nullable: true }) 
  documentTypeId?: string  


  @Field({ nullable: true }) 
  userId?: string  



}
