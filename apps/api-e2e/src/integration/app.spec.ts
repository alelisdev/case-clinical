import { AppModule } from '@case-clinical/api-app-module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.setGlobalPrefix('api')
    await app.init()
  })

  afterEach(async () => {
    return app.close()
  })

  it('/api/uptime (GET)', () => {
    return request(app.getHttpServer()).get('/api/uptime').expect(200)
  })
})
