import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class UserUpdateTemplateInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  signatureFileType?: string
  
  @Field({ nullable: true }) 
  code?: string


  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]
}