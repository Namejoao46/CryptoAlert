import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import api from '../../src/services/api'; // Conferindo o caminho do seu api.js

export default function HomeScreen() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarNoticias = async () => {
    try {
      setLoading(true);
      const response = await api.get('/noticias');
      setNoticias(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Verifique se o Backend está rodando!");
    } finally {
      setLoading(false);
    }
  };

  const deletarNoticia = async (id: number) => {
    try {
      await api.delete(`/noticias/${id}`);
      carregarNoticias();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível deletar");
    }
  };

  useEffect(() => {
    carregarNoticias();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 CryptoAlert News</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#00ff88" />
      ) : (
        <FlatList
          data={noticias}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.coin}>{item.coin}</Text>
                <Text>{item.sentiment === 'up' ? '🚀' : '📉'}</Text>
              </View>
              <Text style={styles.headline}>{item.headline}</Text>
              <Text style={styles.source}>Fonte: {item.source}</Text>
              
              <TouchableOpacity 
                onPress={() => deletarNoticia(item.id)}
                style={styles.deleteButton}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{color: '#888', textAlign: 'center', marginTop: 20}}>
              Nenhuma notícia encontrada.
            </Text>
          }
        />
      )}
      
      <TouchableOpacity style={styles.refreshButton} onPress={carregarNoticias}>
        <Text style={styles.buttonText}>Atualizar Feed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#1e1e1e', padding: 15, borderRadius: 12, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#00ff88' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  coin: { color: '#00ff88', fontWeight: 'bold', fontSize: 16 },
  headline: { color: '#fff', fontSize: 18, fontWeight: '600', marginVertical: 5 },
  source: { color: '#888', fontSize: 12, fontStyle: 'italic' },
  refreshButton: { backgroundColor: '#00ff88', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  buttonText: { fontWeight: 'bold', fontSize: 16, color: '#000' },
  deleteButton: { marginTop: 15, alignSelf: 'flex-end', backgroundColor: '#ff4444', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 }
});