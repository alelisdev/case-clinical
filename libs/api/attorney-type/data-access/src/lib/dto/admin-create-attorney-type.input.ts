import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 


@InputType()
export class AdminCreateAttorneyTypeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateAttorneyInput], { nullable: true }) 
  attorneys?: AdminCreateAttorneyInput[]


}