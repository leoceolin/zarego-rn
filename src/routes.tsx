import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from './pages/Home'
import { Table } from './pages/Table'
import { Countries } from './types/country'

export type RootStackParamList = {
  Home: undefined
  Table: {
    countriesSelected: Countries[]
  }
}

function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Table" component={Table} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
