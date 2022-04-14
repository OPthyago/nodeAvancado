
export interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<LoadFacebookUser.Result | undefined>
}

export namespace LoadFacebookUser {
  export type Params = {
    token: string
  }
  export type Result = {
    name: string
    email: string
    facebookId: string
  }
}
