import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging } from '@case-clinical/api/core/data-access'
import { UserCreateCourseInput } from './dto/user-create-course.input'
import { UserListCourseInput } from './dto/user-list-course.input'
import { UserUpdateCourseInput } from './dto/user-update-course.input'

@Injectable()
export class ApiCourseDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userCourses(userId: string, input?: UserListCourseInput) {
    const courses = await this.data.course.findMany({
      where: {
        AND: [
          {
            name: { contains: input?.name },
            categoryId: input.categoryId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { category: true, courseProgresses: true },
    })

    return courses.map((course) => {
      if(course.courseProgresses?.length > 0) {
        const myCourseProgress = course.courseProgresses.find((courseProgress) => courseProgress.userId === userId)
        if(myCourseProgress) {
          course['progress'] = {
            courseProgressId: myCourseProgress.id,
            currentStep: myCourseProgress.currentStep,
            completed: myCourseProgress.completed
          }
        }
      }
      return course;
    })
  }

  async userCountCourses(userId: string, input?: UserListCourseInput): Promise<CorePaging> {
    const total = await this.data.course.count({
      where: {
        name: {
          contains: input?.name,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCourse(userId: string, courseId) {
    const course = await this.data.course.findUnique({ where: { id: courseId }, include: { category: true, steps: true, courseProgresses: true } })
    const myCourseProgress = course.courseProgresses.find((courseProgress) => courseProgress.userId === userId)
    if(myCourseProgress) {
      course['progress'] = {
        courseProgressId: myCourseProgress.id,
        currentStep: myCourseProgress.currentStep,
        completed: myCourseProgress.completed
      }
    }
    return course;
  }

  async userCreateCourse(userId: string, input: UserCreateCourseInput) {
    return this.data.course.create({
      data: {
        category:
          input.categoryId != null
            ? {
                connect: {
                  id: input.categoryId,
                },
              }
            : undefined,
        name: input.name,
        slug: input.slug,
        title: input.title,
        description: input.description,
        duration: input.duration,
        totalSteps: input.totalSteps,
        featured: input.featured,
        content: input.content,
      },
      include: { category: true },
    })
  }

  async userUpdateCourse(userId: string, courseId: string, input: UserUpdateCourseInput) {
    const course =  await this.data.course.update({
      where: { id: courseId },
      data: {
        name: input.name,
        slug: input.slug,
        title: input.title,
        description: input.description,
        duration: input.duration,
        totalSteps: input.totalSteps,
        featured: input.featured,
        content: input.content,
        categoryId: input.categoryId,
      },
      include: { category: true, courseProgresses: true },
    })

    const myCourseProgress = course.courseProgresses.find((courseProgress) => courseProgress.userId === userId)

    if(myCourseProgress) {
      course['progress'] = {
        courseProgressId: myCourseProgress.id,
        currentStep: myCourseProgress.currentStep,
        completed: myCourseProgress.completed
      }
    }
    return course
  }

  async userDeleteCourse(userId: string, courseId: string) {
    return this.data.course.delete({ where: { id: courseId } })
  }
}
