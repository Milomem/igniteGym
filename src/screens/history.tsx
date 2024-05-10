import { HistoryCard } from '@components/historyCard';
import { Loading } from '@components/loading';
import { ScreenHeader } from '@components/screenHeader';
import { HistoryByDayDTO } from '@dtos/historyByDayDTO';
import { useFocusEffect } from '@react-navigation/native';
import { AppError } from '@utils/appError';
import { Heading, SectionList, VStack, Text, useToast } from 'native-base';
import { useCallback, useState } from 'react';
import { api } from 'src/service/api';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  const toast = useToast();

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');

      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    },[])
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico' />

      {isLoading ? <Loading/> : 
        <SectionList 
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item}/>
          )}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {'\n'}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      }

    </VStack>
  );
}