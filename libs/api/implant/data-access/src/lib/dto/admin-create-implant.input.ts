import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateImplantCategoryInput } from '@case-clinical/api/implant-category/data-access' 
import { AdminCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { AdminCreateManufacturerInput } from '@case-clinical/api/manufacturer/data-access' 
import { AdminCreatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 


@InputType()
export class AdminCreateImplantInput {

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

  @Field(() => [AdminCreatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: AdminCreatePriorAuthorizationImplantInput[]


  @Field(() => AdminCreateImplantCategoryInput ,{ nullable: true }) 
  implantCategory?: AdminCreateImplantCategoryInput  


  @Field(() => AdminCreateContactInput ,{ nullable: true }) 
  salesRepresentative?: AdminCreateContactInput  


  @Field(() => AdminCreateManufacturerInput ,{ nullable: true }) 
  manufacturer?: AdminCreateManufacturerInput  

}