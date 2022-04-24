import { FlatList } from 'react-native';
import { View, Text } from './Themed';

type DataItem = { id: string; [key: string]: string | number };

type Props = {
  itemsData: DataItem[];
  headers: string[];
};

export default function ShowDataList({ itemsData, headers }: Props) {
  const renderHeaders = () => {
    return (
      <View>
        {headers.map((header, index) => (
          <Text key={`header-${index}`}>{header}</Text>
        ))}
      </View>
    );
  };

  const itemsToRender = ({ item, index }: { item: DataItem; index: number }) => {
    const key = `elem-${index}`;
    return (
      <View key={index}>
        {headers.map((header, index) => (
          <Text key={`${key}-item-${index}`}>{item[header]}</Text>
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={itemsData}
      renderItem={itemsToRender}
      ListEmptyComponent={
        <View>
          <Text>EMPTY</Text>
        </View>
      }
      ListHeaderComponent={renderHeaders}
      keyExtractor={item => item.id}
    />
  );
}
