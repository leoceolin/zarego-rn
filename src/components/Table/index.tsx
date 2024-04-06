import React, { useState } from 'react'
import { Country } from '../../types/country'
import { DataTable } from 'react-native-paper'
import { ScrollView, View } from 'react-native'

interface Countries extends Country {
  selected: boolean
}

interface ITable {
  countriesSelected: Countries[]
}

const TABLE_HEAD = [
  {
    label: 'Performance',
    field: 'PerformanceOriented',
  },
  {
    label: 'Autocratic',
    field: 'Autocratic',
  },
  {
    label: 'Decisive',
    field: 'Decisive',
  },
  {
    label: 'Diplomatic',
    field: 'Diplomatic',
  },
  {
    label: 'Face Saver',
    field: 'FaceSaver',
  },
]

export const TableComponent = ({ countriesSelected }: ITable) => {
  const countries = countriesSelected.map((el) => el.CountryName)

  const numberOfItemsPerPage = 3
  const [page, setPage] = useState(0)

  const from = page * numberOfItemsPerPage
  const to = Math.min(
    (page + 1) * numberOfItemsPerPage,
    countriesSelected.length,
  )

  return (
    <View>
      {countries && countriesSelected && (
        <DataTable
          testID="tableContainer"
          style={{
            borderColor: '#000',
          }}
        >
          <DataTable.Header style={{ backgroundColor: '#000' }}>
            <DataTable.Title style={{ minWidth: 60 }}> </DataTable.Title>
            {countries.slice(from, to).map((country) => {
              return (
                <DataTable.Title
                  testID="tableHeaderTitle"
                  key={country}
                  textStyle={{
                    color: '#fff',
                  }}
                >
                  {country}
                </DataTable.Title>
              )
            })}
          </DataTable.Header>
          <ScrollView>
            {TABLE_HEAD.map((el) => {
              return (
                <DataTable.Row
                  testID="tableRow"
                  key={el.field}
                  style={{
                    borderColor: '#000',
                  }}
                >
                  <DataTable.Cell style={{ minWidth: 60 }}>
                    {el.label}
                  </DataTable.Cell>
                  {countriesSelected.slice(from, to).map((country) => {
                    return (
                      <DataTable.Cell key={country.id}>
                        {country[el.field as keyof Countries]}
                      </DataTable.Cell>
                    )
                  })}
                </DataTable.Row>
              )
            })}
          </ScrollView>

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              countriesSelected.length / numberOfItemsPerPage,
            )}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${countriesSelected.length}`}
            numberOfItemsPerPage={numberOfItemsPerPage}
          />
        </DataTable>
      )}
    </View>
  )
}
