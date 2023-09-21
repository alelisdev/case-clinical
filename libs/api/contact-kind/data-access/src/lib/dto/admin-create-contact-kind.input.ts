import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 


@InputType()
export class AdminCreateContactKindInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateContactInput], { nullable: true }) 
  contacts?: AdminCreateContactInput[]


}