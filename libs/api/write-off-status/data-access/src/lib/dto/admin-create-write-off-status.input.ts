import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateWriteOffInput } from '@case-clinical/api/write-off/data-access' 


@InputType()
export class AdminCreateWriteOffStatusInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateWriteOffInput], { nullable: true }) 
  writeOffs?: AdminCreateWriteOffInput[]


}