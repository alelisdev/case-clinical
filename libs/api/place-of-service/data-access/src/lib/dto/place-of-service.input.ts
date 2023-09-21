import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PlaceOfServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  isFacility?: boolean


}
