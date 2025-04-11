import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

function App() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={2} color="obangsaek.blue">
            Korean Meal Planner
          </Heading>
          <Text fontSize="lg" color="neutral.600">
            Plan your Korean meals with ease
          </Text>
        </Box>
        <Box 
          p={6} 
          bg="obangsaek.white" 
          borderRadius="lg" 
          borderWidth="1px" 
          borderColor="neutral.200"
          boxShadow="md"
          width="100%"
          maxW="800px"
        >
          <Heading as="h2" size="md" mb={4} color="obangsaek.red">
            Welcome to Your Korean Culinary Journey
          </Heading>
          <Text>
            This application will help you discover, plan, and organize delicious Korean meals.
            Explore traditional recipes, create weekly meal plans, and generate shopping lists.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
