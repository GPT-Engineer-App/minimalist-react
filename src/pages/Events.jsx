import { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "" });

  const handleAddEvent = () => {
    addEvent.mutate(newEvent);
    setNewEvent({ name: "", date: "", description: "" });
  };

  const handleUpdateEvent = (id, updatedEvent) => {
    updateEvent.mutate({ id, ...updatedEvent });
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <Container maxW="container.md">
      <VStack spacing={4} mt={4}>
        <Text fontSize="2xl" fontWeight="bold">Events</Text>
        {events.map(event => (
          <Box key={event.id} p={4} shadow="md" borderWidth="1px" width="100%">
            <Text fontSize="xl">{event.name}</Text>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
            <Flex mt={2}>
              <Button size="sm" colorScheme="teal" mr={2} onClick={() => handleUpdateEvent(event.id, { name: "Updated Event", date: event.date, description: event.description })}>Update</Button>
              <Button size="sm" colorScheme="red" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
            </Flex>
          </Box>
        ))}
        <Box p={4} shadow="md" borderWidth="1px" width="100%">
          <FormControl id="name" mb={2}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          </FormControl>
          <FormControl id="date" mb={2}>
            <FormLabel>Date</FormLabel>
            <Input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
          </FormControl>
          <FormControl id="description" mb={2}>
            <FormLabel>Description</FormLabel>
            <Input type="text" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
          </FormControl>
          <Button colorScheme="teal" onClick={handleAddEvent}>Add Event</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Events;