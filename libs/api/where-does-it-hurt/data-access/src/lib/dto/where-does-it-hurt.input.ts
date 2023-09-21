import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class WhereDoesItHurtInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  sideId?: string

  @Field({ nullable: true }) 
  bodyPartId?: string


}
