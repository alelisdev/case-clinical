import { Field, InputType } from '@nestjs/graphql'

import { UserCreateOrganizationInput } from '@case-clinical/api/organization/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserCreateFeeScheduleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  organizationId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  modifier?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  medicarePhysicianNonFacilityRate?: number

  @Field({ nullable: true }) 
  physicianNonFacilityFee?: number

  @Field({ nullable: true }) 
  medicarePhysicianFacilityRate?: number

  @Field({ nullable: true }) 
  physicianFacilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: string

  @Field({ nullable: true }) 
  profCf?: string


  @Field(() => UserCreateOrganizationInput ,{ nullable: true }) 
  organization?: UserCreateOrganizationInput  


  @Field(() => UserCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserCreateSpecialtyInput  

}
