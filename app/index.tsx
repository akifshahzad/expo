// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen.</Text>
//     </View>
//   );
// }


// https://docs.google.com/spreadsheets/d/e/2PACX-1vRAi-E5Da_wSaXFaxWRhJiE94mitp0iQ1hmG1NkGUh9llittjGy5bM7YNnaP4WdiGL4o5_P_lKCxlAT/pubhtml



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://api.sheetbest.com/sheets/59210a49-c030-4f80-8067-1a231d3c7803');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item['Image URL'] }} style={styles.image} />
      <Text style={styles.name}>{item['Product Name']}</Text>
      <Text style={styles.price}>{item.Price}</Text>
      <Text style={styles.description}>{item.Description}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    flexBasis: '48%', // 👈 This makes card take ~50% space
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },
  name: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  price: {
    marginTop: 4,
    color: 'green',
    fontSize: 14,
  },
  description: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
});
