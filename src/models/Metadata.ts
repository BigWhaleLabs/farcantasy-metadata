export default interface Metadata {
  external_url: string
  image: string
  name: string
  description: string
  attributes: {
    trait_type: string | number
    value: string | number
  }[]
  fid: number
}
