
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateReviewInput } from './dto/admin-create-review.input'
import { AdminListReviewInput } from './dto/admin-list-review.input'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminUpdateReviewInput } from './dto/admin-update-review.input'

@Injectable()
export class ApiReviewDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminReviews(adminId: string, input?: AdminListReviewInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.review.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true}
    })
  }

  async adminCountReviews(adminId: string, input?: AdminListReviewInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.review.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminReview(adminId: string, reviewId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.review.findUnique({ where: { id: reviewId } , include: {clinicalProvider: true} })
  }

  async checkReviewExist(reviewName: string) {
    try {
      return this.data.review.findMany({ where: { name: reviewName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateReview(adminId: string, input: AdminCreateReviewInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const reviewData = await this.checkReviewExist(input.name)

      if (reviewData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.review.create({
          data: { 
      
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
comment: input.comment, 
rating: input.rating, 
reivewDateAndTime: input.reivewDateAndTime, 

    }
    , include: {clinicalProvider: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateReview(adminId: string, reviewId, input: AdminUpdateReviewInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.review.update({
      where: { id: reviewId },
      data: {
  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name, 
comment: input.comment, 
rating: input.rating, 
reivewDateAndTime: input.reivewDateAndTime, 

}
, include: {clinicalProvider: true} 
    })
  }

  async adminDeleteReview(adminId: string, reviewId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.review.delete({ where: { id: reviewId } })
  }
}

