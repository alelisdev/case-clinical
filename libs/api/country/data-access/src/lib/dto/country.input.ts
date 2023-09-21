import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class CountryInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  iso?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  flagImagePos?: string

}
