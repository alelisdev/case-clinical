import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserUpdateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


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

  @Field(() => [UserUpdateContractInput], { nullable: true }) 
  contracts?: UserUpdateContractInput[]

  @Field(() => [UserUpdateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserUpdateAssignedDocumentInput[]


}