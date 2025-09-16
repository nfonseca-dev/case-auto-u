import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  HStack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import EmailUpload from "~/components/EmailUpload";
import ClassificationResults from "~/components/ClassificationResults";
import { Toaster, toaster } from "~/components/ui/toaster";
import { classifyAndSuggestReply } from "~/services/classifyAndSuggestReplyService";

export default function ClassifyEmailPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [manualText, setManualText] = useState("");
  const [classificationResult, setClassificationResult] = useState<{
    classification: string;
    suggestedReply: string;
  } | null>(null);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleFileUpload = (file: any) => {
    if (!file) {
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
    setManualText("");
    setClassificationResult(null);
    toaster.create({
      title: "Arquivo carregado.",
      description: file.name,
      type: "info",
      duration: 2500,
      closable: true,
    });
  };

  const handleClassify = async () => {
    if (!uploadedFile && (!manualText || manualText.trim() === "")) {
      toaster.create({
        title: "Nenhum arquivo ou texto para classificar.",
        description: "Por favor, carregue um e-mail ou cole o texto.",
        type: "warning",
        duration: 3000,
        closable: true,
      });
      return;
    }

    try {
      const emailContent = uploadedFile ?? manualText;
      const data = await classifyAndSuggestReply(emailContent);
      setClassificationResult({
        classification: data.classification,
        suggestedReply: data.suggestedReply,
      });

      toaster.create({
        title: "Classificação concluída!",
        type: "success",
        duration: 3000,
        closable: true,
      });
    } catch (err) {
      toaster.create({
        title: "Erro na classificação",
        description: (err as Error).message,
        type: "error",
        duration: 5000,
        closable: true,
      });
    }
  };

  const canClassify =
    !!uploadedFile || (manualText && manualText.trim().length > 0);

  return (
    <Container maxW="container.xl" py={10}>
      <Toaster />
      <VStack align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl">
            Classificador de E-mails
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Faça o upload de um arquivo (.txt/.pdf) ou cole o texto do e-mail.
          </Text>
        </Box>

        <EmailUpload onFileUpload={handleFileUpload} />

        <Textarea
          placeholder="Ou cole aqui o conteúdo do e-mail..."
          size="lg"
          value={manualText}
          onChange={(e) => {
            setManualText(e.target.value);
            if (e.target.value.trim().length > 0) setUploadedFile(null);
          }}
          rows={8}
        />

        <HStack justify="center">
          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleClassify}
            disabled={!canClassify}
          >
            Classificar E-mail
          </Button>
        </HStack>

        {classificationResult && (
          <ClassificationResults result={classificationResult} />
        )}
      </VStack>
    </Container>
  );
}
