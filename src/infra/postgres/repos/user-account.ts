import { getRepository } from 'typeorm'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async saveWithFacebook(params: SaveFacebookAccountRepository.Params): Promise<SaveFacebookAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)

    const pgUser = await pgUserRepo.save({
      email: params.email,
      name: params.name,
      facebookId: params.facebookId
    })

    return {id: String(pgUser.id)}
  }

  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }
}
