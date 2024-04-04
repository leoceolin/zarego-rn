import { SafeAreaView, Text } from 'react-native'
import { TableComponent } from '../../components/Table'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../routes'
import { PageTitle, GoBackButton } from './styles'
type TableProps = NativeStackScreenProps<RootStackParamList, 'Table'>

export const Table = ({ route, navigation }: TableProps) => {
  const { countriesSelected } = route.params
  const GoBackString = '< Back'
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <GoBackButton onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 25, color: 'blue' }}> {GoBackString} </Text>
      </GoBackButton>
      <PageTitle>Data</PageTitle>
      <TableComponent countriesSelected={countriesSelected} />
    </SafeAreaView>
  )
}
