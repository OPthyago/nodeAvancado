import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUser } from '@/data/contracts/apis'
class FaceBookApi {
  private readonly baseUrl: string = 'https://graph.facebook.com'

  constructor (private readonly httpClient: HttpGetClient, private readonly clientId: string, private readonly clientSecret: string) {

  }

  async loadUser (params: LoadFacebookUser.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.baseUrl}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials'
      }
    })
  }
}

namespace HttpGetClient {
  export type Params = {
    url: string
    params: Object
  }
}

interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>
}

describe('FacebookAPI', () => {
  const clientId = 'any_client_id'
  const clientSecret = 'any_client_secret'

  let sut: FaceBookApi
  let httpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new FaceBookApi(httpClient, clientId, clientSecret)
  })

  it('hound get app token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
    expect(httpClient.get).toBeCalledTimes(1)
  })
})
