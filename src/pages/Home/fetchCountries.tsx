import { getCountries } from '../../services/country/getCountries'

export const fetchCountries = async ({ pageParam }: { pageParam: number }) => {
  const {
    data: { countries },
  } = await getCountries(pageParam)

  const finalCountries = countries.map((el) => {
    return { ...el, selected: false }
  })
  return finalCountries
}
