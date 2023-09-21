import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateImplantInput } from '@case-clinical/api/implant/data-access' 


@InputType()
export class UserUpdateImplantCategoryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateImplantInput], { nullable: true }) 
  implants?: UserUpdateImplantInput[]


}