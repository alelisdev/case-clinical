import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SasTokenRequest {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  extension?: string

  @Field({ nullable: true }) 
  userId?: string
  
  @Field({ nullable: true }) 
  parentId?: string

  @Field({ nullable: true }) 
  expenseId?: string

  @Field({ nullable: true }) 
  injuryId?: string

}
