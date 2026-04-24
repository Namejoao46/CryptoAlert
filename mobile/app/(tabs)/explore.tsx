import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import api from '../../src/services/api';

export default function TabTwoScreen() {
  const router = useRouter();
  const [coin, setCoin] = useState('');
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [sentiment, setSentiment] = useState('neutral'); // up, down, neutral
  const [source, setSource] = useState('');

  const salvarNoticia = async () => {
    if (!coin || !headline || !content || !source) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      await api.post('/noticias', {
        coin,
        headline,
        content,
        sentiment,
        source
      });

      Alert.alert("Sucesso", "Notícia postada!");
      // Limpa os campos
      setCoin(''); setHeadline(''); setContent(''); setSource('');
      // Volta para a aba de listagem
      router.push('/');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a notícia.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Notícia 📝</Text>

      <Text style={styles.label}>Moeda (Ex: BTC, ETH)</Text>
      <TextInput style={styles.input} value={coin} onChangeText={setCoin} placeholder="Sigla da moeda" placeholderTextColor="#666" />

      <Text style={styles.label}>Manchete</Text>
      <TextInput style={styles.input} value={headline} onChangeText={setHeadline} placeholder="Título da notícia" placeholderTextColor="#666" />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput style={[styles.input, {height: 80}]} value={content} onChangeText={setContent} multiline placeholder="Resumo da notícia" placeholderTextColor="#666" />

      <Text style={styles.label}>Fonte</Text>
      <TextInput style={styles.input} value={source} onChangeText={setSource} placeholder="Ex: Cointelegraph" placeholderTextColor="#666" />

      <Text style={styles.label}>Sentimento do Mercado</Text>
      <View style={styles.sentimentRow}>
        {['up', 'neutral', 'down'].map((s) => (
          <TouchableOpacity 
            key={s} 
            style={[styles.sentimentBtn, sentiment === s && styles.sentimentBtnActive]} 
            onPress={() => setSentiment(s)}
          >
            <Text style={styles.btnText}>{s === 'up' ? '🚀 Alta' : s === 'down' ? '📉 Baixa' : '😐 Neutro'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={salvarNoticia}>
        <Text style={styles.saveButtonText}>Publicar Notícia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  label: { color: '#00ff88', marginBottom: 5, fontWeight: 'bold' },
  input: { backgroundColor: '#1e1e1e', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 15 },
  sentimentRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  sentimentBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8, flex: 1, marginHorizontal: 2, alignItems: 'center' },
  sentimentBtnActive: { backgroundColor: '#00ff88' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  saveButton: { backgroundColor: '#00ff88', padding: 18, borderRadius: 10, alignItems: 'center', marginBottom: 50 },
  saveButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});