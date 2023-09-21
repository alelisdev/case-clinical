import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { FileVineService } from './file-vine.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { map } from 'lodash';
import exp from 'constants';

describe('FileVineService (integration)', () => {
  let service: FileVineService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FileVineService],
    }).compile();

    service = module.get<FileVineService>(FileVineService);
    await service.onModuleInit();
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should make a remote call', async () => {
    const result: AxiosResponse = {
      // your expected AxiosResponse
      data: {
        // ...data
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };



    // TODO: put back after capturing a real response 
    //jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result));

    // Expectation for service.methodThatUsesHttpService
    if(!service.session) {
        await service.onModuleInit();
    }

    let projects = await service.getProjects();
    console.log(projects);
  });
});