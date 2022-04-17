import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUser } from '@/data/contracts/apis'
class FaceBookApi {
  private readonly baseUrl: string = 'https://graph.facebook.com'

  constructor (private readonly httpClient: HttpGetClient) {

  }

  async loadUser (params: LoadFacebookUser.Params): Promise<void> {
    await this.httpClient.get({ url: `${this.baseUrl}/oauth/access_token` })
  }
}

namespace HttpGetClient {
  export type Params = {
    url: string
  }
}

interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<void>
}

describe('FacebookAPI', () => {
  let sut: FaceBookApi
  let httpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new FaceBookApi(httpClient)
  })

  it('hound get app token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token'
    })
  })
})
