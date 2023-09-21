import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class PchProviderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string
}
