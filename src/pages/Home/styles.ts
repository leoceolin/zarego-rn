import styled from 'styled-components';
import { TouchableOpacity, SafeAreaView } from 'react-native'

export const Container = styled(SafeAreaView)`
  display:flex;
  align-items:center;
  height:100%;
  padding-top: 35px;
  gap: 20px;
`

interface IButtonGenerate {
  selected?: boolean;
}

export const ButtonCountry = styled(TouchableOpacity) <IButtonGenerate>`
  font-size: 1em;
  border-width:1px;
  border-bottom-width:0px;
  background: ${props => (props.selected ? '#ADD8E6' : 'white')};
  width: 250px;
  justify-content:center;
  align-items:center;
  padding: 10px;
`;

export const Button = styled(TouchableOpacity)`
  font-size: 1em;
  border: 1px solid #000;
  width: 250px;
  justify-content:center;
  align-items:center;
  padding: 10px;
`;
