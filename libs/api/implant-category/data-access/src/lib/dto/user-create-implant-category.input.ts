import { Field, InputType } from '@nestjs/graphql'

import { UserCreateImplantInput } from '@case-clinical/api/implant/data-access' 


@InputType()
export class UserCreateImplantCategoryInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateImplantInput], { nullable: true }) 
  implants?: UserCreateImplantInput[]


}
