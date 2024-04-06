import React from 'react'
import { render } from '@testing-library/react-native'
import { TableComponent } from '..'
import { mockedCountries } from '../../../../mocks/mockData'

jest.useFakeTimers()

describe('TableComponent', () => {
  it('Should render table with correct data', () => {
    const { getByTestId, getAllByTestId } = render(
      <TableComponent countriesSelected={mockedCountries} />,
    )

    const tableContainer = getByTestId('tableContainer')
    expect(tableContainer).toBeTruthy()

    const tableRows = getAllByTestId('tableRow')
    expect(tableRows.length).toBe(5)

    const tableHeaderTitles = getAllByTestId('tableHeaderTitle')
    expect(tableHeaderTitles.length).toBe(3)
  })
})
