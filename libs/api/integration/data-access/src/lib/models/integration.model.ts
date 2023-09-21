import { Field, ObjectType } from '@nestjs/graphql'

import { ContactSetting } from '@case-clinical/api/contact-setting/data-access' 


@ObjectType()
export class Integration {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [ContactSetting], { nullable: true }) 
  contactSettings?: ContactSetting[]


}
