
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

describe('PgUserAccountRepository', () => {
  let pgUserRepo: Repository<PgUser>
  let sut: PgUserAccountRepository
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({
        email: 'existing_email'
      })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({
        id: '1'
      })
    })

    it('should return undefinded if email does not exists', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('saveWithFacebook', () => {
    it('should create an account if id is undefined', async () => {
       await sut.saveWithFacebook({
        email: 'existing_email',
        name: 'existing_name',
        facebookId: 'existing_facebookId',
      })

      const fbAccount = await pgUserRepo.findOne({email: 'existing_email'})

      expect(fbAccount?.id).toEqual(1)
    })
  });
})
