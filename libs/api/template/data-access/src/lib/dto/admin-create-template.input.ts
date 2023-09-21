import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreateAssignedDocumentInput } from '@case-clinical/api/assigned-document/data-access' 


@InputType()
export class AdminCreateTemplateInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  attachment?: string

  @Field({ nullable: true }) 
  encoding?: string

  @Field({ nullable: true }) 
  signatureFileType?: string

  @Field(() => [AdminCreateContractInput], { nullable: true }) 
  contracts?: AdminCreateContractInput[]

  @Field(() => [AdminCreateAssignedDocumentInput], { nullable: true }) 
  assignedDocuments?: AdminCreateAssignedDocumentInput[]


}