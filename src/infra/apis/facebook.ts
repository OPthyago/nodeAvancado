import { HttpGetClient } from '@/infra/http'
import { LoadFacebookUser } from '@/data/contracts/apis'

export class FaceBookApi implements LoadFacebookUser {
  private readonly baseUrl: string = 'https://graph.facebook.com'

  constructor (private readonly httpClient: HttpGetClient, private readonly clientId: string, private readonly clientSecret: string) {
  }

  async loadUser (params: LoadFacebookUser.Params): Promise<LoadFacebookUser.Result> {
    const appToken = await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
    const debugToken = await this.httpClient.get({
      url: `${this.baseUrl}/oauth/debug_token`,
      params: {
        access_token: appToken.access_token,
        input_token: params.token,
        grant_type: 'client_credentials'
      }
    })
    const fbUserInfo = await this.httpClient.get({
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url: `${this.baseUrl}/${debugToken.data.user_id}`,
      params: {
        fields: ['id', 'name', 'email'].join(','),
        access_token: params.token
      }
    })

    return {
      email: fbUserInfo.email,
      facebookId: fbUserInfo.id,
      name: fbUserInfo.name
    }
  }
}
