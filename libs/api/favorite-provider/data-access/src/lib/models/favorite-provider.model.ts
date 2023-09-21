import { Field, ObjectType } from '@nestjs/graphql'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'
import { Specialty } from '@case-clinical/api/specialty/data-access'
import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class FavoriteProvider {

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
  userId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => ClinicalProvider, { nullable: true }) 
  clinicalProvider?: ClinicalProvider 
  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

  @Field(() => User, { nullable: true }) 
  user?: User  
}
