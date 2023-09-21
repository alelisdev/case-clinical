import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'


@ObjectType()
export class Award {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  school?: string

  @Field({ nullable: true }) 
  awardedAt?: Date

  @Field({ nullable: true }) 
  note?: string


  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

}
