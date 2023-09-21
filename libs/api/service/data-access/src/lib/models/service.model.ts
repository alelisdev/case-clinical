import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProviderService } from '@case-clinical/api/clinical-provider-service/data-access' 


@ObjectType()
export class Service {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [ClinicalProviderService], { nullable: true }) 
  clinicalProviderServices?: ClinicalProviderService[]


}
