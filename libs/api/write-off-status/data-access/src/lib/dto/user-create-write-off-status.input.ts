import { Field, InputType } from '@nestjs/graphql'

import { UserCreateWriteOffInput } from '@case-clinical/api/write-off/data-access' 


@InputType()
export class UserCreateWriteOffStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateWriteOffInput], { nullable: true }) 
  writeOffs?: UserCreateWriteOffInput[]


}
