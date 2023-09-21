import { Field, ObjectType } from '@nestjs/graphql'

import { Organization } from '@case-clinical/api/organization/data-access'

import { Specialty } from '@case-clinical/api/specialty/data-access'


@ObjectType()
export class FacilityFeeSchedule {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

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
  medicareFacilityRate?: number

  @Field({ nullable: true }) 
  facilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: number

  @Field({ nullable: true }) 
  profCf?: number


  @Field(() => Organization, { nullable: true }) 
  organization?: Organization  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

}
