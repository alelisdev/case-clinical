import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateImplantInput } from '@case-clinical/api/implant/data-access' 


@InputType()
export class AdminCreateImplantCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateImplantInput], { nullable: true }) 
  implants?: AdminCreateImplantInput[]


}