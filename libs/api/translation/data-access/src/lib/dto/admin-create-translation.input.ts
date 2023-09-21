import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AdminCreateTranslationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  languageCode?: string

  @Field({ nullable: true }) 
  translation?: string


}