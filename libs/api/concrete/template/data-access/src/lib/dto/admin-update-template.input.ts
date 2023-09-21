import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class AdminUpdateTemplateInput {

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

  @Field(() => [AdminUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminUpdateAssignedDocumentInput[]

  @Field({ nullable: true }) 
  code?: string
  
}