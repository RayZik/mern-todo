export type ThunkCallback<T = any> = (err: any, data?: T) => void

export type ThunkWithCallback ={
  callback: ThunkCallback
}