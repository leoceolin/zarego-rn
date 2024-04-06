import { QueryClient, QueryClientProvider } from 'react-query'
import { screen, fireEvent, render } from '@testing-library/react-native'
import useFetchCountries from '../useFetchCountries'
import { mockedCountries } from '../../../../mocks/mockData'
import Routes, { RootStackParamList } from '../../../routes'
import { Home } from '..'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const queryClient = new QueryClient()
const mockedQuery = useFetchCountries as jest.Mock<any>

jest.mock('../useFetchCountries')

describe('Home', () => {
  function createComponent() {
    return (
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    )
  }

  beforeEach(() => {
    mockedQuery.mockImplementation(() => ({
      status: 'success',
      data: {
        pages: [mockedCountries],
      },
      hasNextPage: true,
      isFetching: false,
      isLoading: false,
    }))
  })

  it('Should render loading component when query is fetching api data', () => {
    mockedQuery.mockImplementation(() => ({
      isLoading: true,
    }))

    const { getByTestId } = render(createComponent())

    const loadingComponent = getByTestId('loading')

    expect(loadingComponent).toBeTruthy()
  })

  it('Should render list component after query finish fetch api data', () => {
    const { getByTestId, getAllByTestId } = render(createComponent())

    const listCountriesComponent = getByTestId('countriesList')
    const countriesItemList = getAllByTestId('countryItemList')

    expect(listCountriesComponent).toBeTruthy()
    expect(countriesItemList.length).toBe(10)
  })
})
