import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { UserUpdateMedLevelInput } from '@case-clinical/api/med-level/data-access' 


@InputType()
export class UserUpdateRequiredFieldInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string


  @Field(() => UserUpdateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: UserUpdateAccidentTypeInput  


  @Field(() => UserUpdateMedLevelInput ,{ nullable: true }) 
  medLevel?: UserUpdateMedLevelInput  

}