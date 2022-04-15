import { FacebookAccount } from '@/domain/models'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_facebook_name',
    email: 'any_facebook_email',
    facebookId: 'any_facebook_id'
  }

  it('should create a FacebookData model only', () => {
    const sut = new FacebookAccount(fbData)
    expect(sut).toEqual(fbData)
  })

  it('should update name if its empty', () => {
    const sut = new FacebookAccount(fbData, {
      id: 'any_id'
    })
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })

  it('should not update name if its not empty', () => {
    const sut = new FacebookAccount(fbData, {
      id: 'any_id',
      name: 'any_name'
    })
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })
})
