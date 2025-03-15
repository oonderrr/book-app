import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-red-600">Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
