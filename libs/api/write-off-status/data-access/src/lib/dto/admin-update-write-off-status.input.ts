import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateWriteOffInput } from '@case-clinical/api/write-off/data-access' 


@InputType()
export class AdminUpdateWriteOffStatusInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateWriteOffInput], { nullable: true }) 
  writeOffs?: UserUpdateWriteOffInput[]


}