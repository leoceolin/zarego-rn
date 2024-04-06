import React, { useEffect, useMemo, useState } from 'react'
import { Countries, Country } from '../../types/country'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import useFetchCountries from './useFetchCountries'
import { Button, ButtonCountry, Container } from './styles'
import { RootStackParamList } from '../../routes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

interface IRenderCountry {
  countryId: string
  countryName: string
  selected: boolean
}

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation }: HomeProps) {
  const [countriesSelected, setCountriesSelected] = useState<Countries[]>([])

  const { data, hasNextPage, isLoading, fetchNextPage } = useFetchCountries()

  const keyExtractor = (_: any, index: number) => index.toString()

  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }

  const handleSelectCountry = (countryParam: Countries) => {
    const checkIfCountryIsSelected = countriesSelected.some(
      (elem) => elem.id === countryParam.id,
    )

    if (checkIfCountryIsSelected) {
      const filteredCountries = countriesSelected.filter(
        (item) => item.id !== countryParam.id,
      )

      setCountriesSelected(filteredCountries)
    } else {
      const countryToAdd = [...new Set([...countriesSelected, countryParam])]
      setCountriesSelected(countryToAdd)
    }
  }

  const countries = data?.pages ? data?.pages?.flatMap((page) => [...page]) : []

  return (
    <Container>
      <Text style={{ fontSize: 40 }}>Choose Countries</Text>
      {isLoading ? (
        <View testID="loading">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          testID="countriesList"
          style={{
            flexGrow: 0,
            maxHeight: '60%',
            borderStyle: 'solid',
            borderColor: 'black',
          }}
          data={countries}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <ButtonCountry
              testID="countryItemList"
              key={item.id}
              selected={item.selected}
              onPress={() => {
                handleSelectCountry(item)
                item.selected = !item.selected
              }}
            >
              <Text>{item.CountryName}</Text>
            </ButtonCountry>
          )}
          onEndReached={onReachEnd}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            <View
              style={{
                borderTopWidth: 1,
              }}
            />
          )}
        />
      )}

      <Button testID="buttonSeeData">
        <Text
          style={{ fontSize: 25 }}
          onPress={() =>
            navigation.navigate('Table', {
              countriesSelected,
            })
          }
        >
          See Data
        </Text>
      </Button>
    </Container>
  )
}
