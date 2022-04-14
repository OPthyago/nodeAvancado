import { FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { LoadFacebookUser } from '@/data/contracts/apis'

export class FacebookauthenticationService {
  constructor (private readonly loadFacebookUser: LoadFacebookUser) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUser.loadUser(params)
    return new AuthenticationError()
  }
}
