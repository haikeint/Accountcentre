import { FetchResult } from '@/wraper/FetchResult'

const makeHTTP = (url: string, option: {} | string): Promise<FetchResult> => {
  //   const option = {
  // method: method,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer token123'
  //   },
  // body: JSON.stringify({ key: 'value' }),
  // mode: 'cors',
  // credentials: 'include'
  //   }
  return new Promise((resolve, reject) => {
    const result: FetchResult = { status: 0, data: {}, error: null }
    fetch(url, typeof option == 'string' ? { method: option } : option)
      .then((res) => {
        result.status = res.status
        return res.json()
      })
      .then((body) => {
        result.data = body
        resolve(result)
      })
      .catch((error) => {
        result.error = error
        reject(result)
      })
  })
}

export default makeHTTP
