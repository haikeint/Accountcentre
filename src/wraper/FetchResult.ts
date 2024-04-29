export class FetchResult {
  status: number
  data: any
  error: Error | null
  constructor(status: number = 0, data: any = {}, error: Error | null = null) {
    this.status = status
    this.data = data
    this.error = error
  }
}
