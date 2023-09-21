import { Field, ObjectType } from '@nestjs/graphql'

import { Service } from '@case-clinical/api/service/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'


@ObjectType()
export class ClinicalProviderService {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  serviceId?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => Service, { nullable: true }) 
  service?: Service  

  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

}
