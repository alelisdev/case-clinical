import { Field, ObjectType } from '@nestjs/graphql'

import { ImplantCategory } from '@case-clinical/api/implant-category/data-access'

import { Contact } from '@case-clinical/api/contact/data-access'

import { Manufacturer } from '@case-clinical/api/manufacturer/data-access'
import { PriorAuthorizationImplant } from '@case-clinical/api/prior-authorization-implant/data-access' 


@ObjectType()
export class Implant {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  estimatedCost?: number

  @Field({ nullable: true }) 
  implantCategoryId?: string

  @Field({ nullable: true }) 
  manufacturerId?: string

  @Field({ nullable: true }) 
  photoUrl?: string

  @Field({ nullable: true }) 
  salesRepresentativeId?: string

  @Field({ nullable: true }) 
  sku?: string

  @Field(() => [PriorAuthorizationImplant], { nullable: true }) 
  priorAuthorizationImplants?: PriorAuthorizationImplant[]


  @Field(() => ImplantCategory, { nullable: true }) 
  implantCategory?: ImplantCategory  

  @Field(() => Contact, { nullable: true }) 
  salesRepresentative?: Contact  

  @Field(() => Manufacturer, { nullable: true }) 
  manufacturer?: Manufacturer  

}
