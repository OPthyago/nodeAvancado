import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUser } from '@/data/contracts/apis'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from '@/data/contracts/repos'

export class FacebookauthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUser,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) {}

  async perform (
    params: FacebookAuthentication.Params
  ): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      await this.userAccountRepository.load({ email: fbData.email })
      await this.userAccountRepository.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
