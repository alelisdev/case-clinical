import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RoleFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  roleId?: string
}
