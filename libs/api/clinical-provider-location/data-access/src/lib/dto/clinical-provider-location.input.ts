import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClinicalProviderLocationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  locationId?: string

}
