import { Box, Text, VStack, Button } from "@chakra-ui/react";
import { toaster } from "./ui/toaster";

export default function ClassificationResults({
  result,
}: {
  result: { classification: string; suggestedReply: string };
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.suggestedReply || "");
    } catch {
      toaster.create({
        title: "Copiar para área de transferência falhou",
        type: "error",
        duration: 4000,
        closable: true,
      });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} shadow="sm">
      <VStack align="start">
        <Text>
          <strong>Categoria:</strong> {result.classification}
        </Text>
        <Text>
          <strong>Resposta sugerida:</strong>
        </Text>
        <Box
          as="pre"
          whiteSpace="pre-wrap"
          p={3}
          width="100%"
          borderRadius="md"
        >
          {result.suggestedReply || "—"}
        </Box>

        <Button size="sm" onClick={handleCopy}>
          Copiar resposta sugerida
        </Button>
      </VStack>
    </Box>
  );
}
