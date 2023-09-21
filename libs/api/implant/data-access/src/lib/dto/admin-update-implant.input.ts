import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateImplantCategoryInput } from '@case-clinical/api/implant-category/data-access' 
import { AdminUpdateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminUpdateManufacturerInput } from '@case-clinical/api/manufacturer/data-access' 
import { UserUpdatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 


@InputType()
export class AdminUpdateImplantInput {

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


  @Field(() => AdminUpdateImplantCategoryInput ,{ nullable: true }) 
  implantCategory?: AdminUpdateImplantCategoryInput  


  @Field(() => AdminUpdateContactInput ,{ nullable: true }) 
  salesRepresentative?: AdminUpdateContactInput  


  @Field(() => AdminUpdateManufacturerInput ,{ nullable: true }) 
  manufacturer?: AdminUpdateManufacturerInput  

}