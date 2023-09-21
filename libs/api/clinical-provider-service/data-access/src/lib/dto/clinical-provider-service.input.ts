import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClinicalProviderServiceInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string
}
