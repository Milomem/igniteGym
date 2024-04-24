import { HistoryCard } from '@components/historyCard';
import { ScreenHeader } from '@components/screenHeader';
import { Heading, SectionList, VStack, Text } from 'native-base';
import { useState } from 'react';

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ["Puxada frontal", "Remada unilateral"]
    },
    {
      title: '27.08.22',
      data: ["Puxada frontal"]
    }
  ]);
  return (
    <VStack flex={1}>
      <ScreenHeader title='Histórico' />

      <SectionList 
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
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

    </VStack>
  );
}