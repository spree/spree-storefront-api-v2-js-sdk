import Axios, { AxiosInstance } from 'axios'

export default class Http {
  public host: string;
  public spreeToken: string
  public axios: AxiosInstance

  constructor() {
    this.host = process.env.SPREE_HOST || 'http://localhost:3000/api/v2/storefront'

    this.axios = Axios.create({
      baseURL: this.host,
      headers: {
        'Content-Type': 'application/vnd.api+json'
      }
    })
  }

  async get(q, params = {}) {
    if (this.spreeToken) this.setHeaders()

    return await this.axios.get(q, { params: { ...params }})
  }

  async post(q, params = {}) {
    if (this.spreeToken) this.setHeaders()

    return await this.axios.post(q, params)
  }

  async patch(q, params = {}) {
    if (this.spreeToken) this.setHeaders()

    return await this.axios.patch(q, params)
  }

  async delete(q, params = {}) {
    if (this.spreeToken) this.setHeaders()

    return await this.axios.delete(q, params)
  }

  private setHeaders() {
    const currentHeader = this.axios.defaults.headers
    this.axios.defaults.headers = { 
      ...currentHeader, 
      ...this.spreeOrderHeaders 
    }
  }

  get spreeOrderHeaders() {
    return {
      'X-Spree-Order-Token': this.spreeToken,
    }
  }
}