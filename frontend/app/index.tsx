import { api } from '@/lib/api';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  useEffect(() => {
    const res = api.books.$get();
    const data = res.then((r) => r.json());
    console.log('hono api:', data);
  });

  return (
    <SafeAreaView>
      <View>
        <Text className="text-3xl text-red-600">Hello</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
