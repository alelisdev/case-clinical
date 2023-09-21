import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class SideInput {

  @Field({ nullable: true }) 
  name?: string


}
