import { HttpGetClient } from '@/infra/http'
import { FaceBookApi } from '@/infra/apis'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAPI', () => {
  let clientId: string
  let clientSecret: string

  let sut: FaceBookApi
  let httpClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    httpClient = mock()
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
  })

  beforeEach(() => {
    httpClient.get
      .mockResolvedValueOnce({
        access_token: 'any_app_token'
      })
      .mockResolvedValueOnce({
        data: { user_id: 'any_user_id' }
      })
      .mockResolvedValueOnce({
        id: 'any_fb_id',
        name: 'any_fb_name',
        email: 'any_fb_email'
      })
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
  })

  it('should get debug token', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token',
        grant_type: 'client_credentials'
      }
    })
  })

  it('should get user info', async () => {
    await sut.loadUser({ token: 'any_client_token' })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/any_user_id',
      params: {
        fields: 'id,name,email',
        access_token: 'any_client_token'
      }
    })
  })

  it('should return facebook user info', async () => {
    const fbUser = await sut.loadUser({ token: 'any_client_token' })

    expect(fbUser).toEqual({
      facebookId: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    })
  })
})