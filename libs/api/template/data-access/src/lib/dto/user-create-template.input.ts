import { Field, InputType } from '@nestjs/graphql'

import { UserCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { UserCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class UserCreateTemplateInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  signatureFileType?: string

  @Field(() => [UserCreateContractInput], { nullable: true }) 
  contracts?: UserCreateContractInput[]

  @Field(() => [UserCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: UserCreateAssignedDocumentInput[]


}
