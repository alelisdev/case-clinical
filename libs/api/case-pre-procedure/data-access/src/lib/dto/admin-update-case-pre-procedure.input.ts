import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 


@InputType()
export class AdminUpdateCasePreProcedureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  procedureType?: string

  @Field({ nullable: true }) 
  procedureDate?: Date

  @Field({ nullable: true }) 
  dateCreated?: Date

  @Field({ nullable: true }) 
  removed?: boolean


  @Field(() => AdminUpdateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminUpdateLegalCaseInput  

}