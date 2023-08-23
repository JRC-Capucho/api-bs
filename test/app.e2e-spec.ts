import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { UserDto } from 'src/user/dto';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { EditCompanyDto } from 'src/company/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'joao@gmail.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no format email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: 'joao' })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no format email', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: 'joao' })
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get current', () => {
      it('should throw if no headers', () => {
        return pactum.spec().get('/users/me').expectStatus(401);
      });
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: UserDto = {
          firstName: 'Joao',
          lastName: 'Capucho',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
  describe('Company', () => {
    describe('Create Company', () => {
      it('should throw if no body', () => {
        return pactum
          .spec()
          .post('/company/create')
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .expectStatus(400);
      });
      it('should throw if name null', () => {
        const dto: CreateCompanyDto = {
          name: '',
          cnpj: '1212131313',
        };
        return pactum
          .spec()
          .post('/company/create')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .expectStatus(400);
      });

      it('should throw if cpnj null', () => {
        const dto: CreateCompanyDto = {
          name: 'teste',
          cnpj: '',
        };
        return pactum
          .spec()
          .post('/company/create')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .expectStatus(400);
      });

      it('Should Create Company', () => {
        const dto: CreateCompanyDto = {
          name: 'Nike',
          cnpj: '1212131313',
        };
        return pactum
          .spec()
          .post('/company/create')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer  $S{userAt}',
          })
          .expectStatus(201);
      });
    });

    describe('Edit company', () => {
      it('Should Edit Company', () => {
        const dto: EditCompanyDto = {
          name: 'Logitech',
          cnpj: '987987987',
        };
        return pactum
          .spec()
          .patch('/company/edit')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });
  describe('Product', () => {
    describe('Create Product', () => {});
    describe('Get Product by ID', () => {});
    describe('Get Product by ID', () => {});
    describe('Edit Product by ID', () => {});
    describe('Delete Product by ID', () => {});
  });

  it.todo('should pass');
});
