import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLeadInput } from '@case-clinical/api/lead/data-access' 


@InputType()
export class AdminCreateLeadSourceInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateLeadInput], { nullable: true }) 
  leads?: AdminCreateLeadInput[]


}