import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateBodyPartLeadInput } from '@case-clinical/api/body-part-lead/data-access' 


@InputType()
export class AdminCreateBodyPartInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateBodyPartLeadInput], { nullable: true }) 
  leads?: AdminCreateBodyPartLeadInput[]


}