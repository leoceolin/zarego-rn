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
  const [countryId, setCountryId] = useState('')
  const [allCountries, setAllCountries] = useState<Countries[]>([])
  const [countriesSelected, setCountriesSelected] = useState<Countries[]>([])

  const { data, hasNextPage, isLoading, fetchNextPage } = useFetchCountries()

  const keyExtractor = (_: any, index: number) => index.toString()

  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }

  const handleSelectCountry = (countryIdParam: string) => {
    setCountryId(countryIdParam)
    setAllCountries(
      allCountries.map((item) =>
        item.id === countryIdParam
          ? { ...item, selected: !item.selected }
          : item,
      ),
    )
  }

  const countries = useMemo(() => {
    return data?.pages.reduce((_, page) => {
      return [...allCountries, ...page]
    }, [])
  }, [data])

  useEffect(() => {
    if (countries) {
      setAllCountries(countries)
    }
  }, [countries])

  useEffect(() => {
    if (countryId) {
      allCountries.forEach((item) => {
        if (item.id === countryId && item.selected) {
          const countryToAdd = [...new Set([...countriesSelected, item])]
          setCountriesSelected(countryToAdd)
        } else if (item.id === countryId) {
          const countryToRemove = countriesSelected.filter(
            (item) => item.id !== countryId,
          )
          setCountriesSelected(countryToRemove)
        }
      })
    }
  }, [allCountries, countryId])

  const RenderCountry = ({
    countryId,
    countryName,
    selected,
  }: IRenderCountry) => (
    <ButtonCountry
      key={countryId}
      selected={selected}
      onPress={() => {
        handleSelectCountry(countryId)
      }}
    >
      <Text>{countryName}</Text>
    </ButtonCountry>
  )

  return (
    <Container>
      <Text style={{ fontSize: 40 }}>Choose Countries</Text>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          style={{
            flexGrow: 0,
            maxHeight: '60%',
            borderStyle: 'solid',
            borderColor: 'black',
          }}
          data={allCountries}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <RenderCountry
              countryId={item.id}
              countryName={item.CountryName}
              selected={item.selected}
            />
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

      <Button>
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
