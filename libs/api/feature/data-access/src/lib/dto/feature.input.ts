import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class FeatureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string


}
