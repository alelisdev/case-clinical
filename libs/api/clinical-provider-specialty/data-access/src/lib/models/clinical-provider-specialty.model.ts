import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { Specialty } from '@case-clinical/api/specialty/data-access'


@ObjectType()
export class ClinicalProviderSpecialty {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

}
