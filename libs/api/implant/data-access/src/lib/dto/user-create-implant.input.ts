import { Field, InputType } from '@nestjs/graphql'

import { UserCreateImplantCategoryInput } from '@case-clinical/api/implant-category/data-access' 
import { UserCreateContactInput } from '@case-clinical/api/contact/data-access' 
import { UserCreateManufacturerInput } from '@case-clinical/api/manufacturer/data-access' 
import { UserCreatePriorAuthorizationImplantInput } from '@case-clinical/api/prior-authorization-implant/data-access' 


@InputType()
export class UserCreateImplantInput {

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

  @Field(() => [UserCreatePriorAuthorizationImplantInput], { nullable: true }) 
  priorAuthorizationImplants?: UserCreatePriorAuthorizationImplantInput[]


  @Field(() => UserCreateImplantCategoryInput ,{ nullable: true }) 
  implantCategory?: UserCreateImplantCategoryInput  


  @Field(() => UserCreateContactInput ,{ nullable: true }) 
  salesRepresentative?: UserCreateContactInput  


  @Field(() => UserCreateManufacturerInput ,{ nullable: true }) 
  manufacturer?: UserCreateManufacturerInput  

}
