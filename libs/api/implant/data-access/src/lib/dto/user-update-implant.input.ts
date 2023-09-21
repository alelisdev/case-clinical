import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateImplantCategoryInput } from '@case-clinical/api/implant-category/data-access' 
import { UserUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserUpdateManufacturerInput } from '@case-clinical/api/manufacturer/data-access' 
import { UserUpdatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 


@InputType()
export class UserUpdateImplantInput {

  @Field({ nullable: true }) 
  id?: string

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

  @Field(() => [UserUpdatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: UserUpdatePriorAuthorizationImplantInput[]


  @Field(() => UserUpdateImplantCategoryInput ,{ nullable: true }) 
  implantCategory?: UserUpdateImplantCategoryInput  


  @Field(() => UserUpdateContactInput ,{ nullable: true }) 
  salesRepresentative?: UserUpdateContactInput  


  @Field(() => UserUpdateManufacturerInput ,{ nullable: true }) 
  manufacturer?: UserUpdateManufacturerInput  

}