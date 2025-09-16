import React, { useRef, useState } from "react";
import {
  VStack,
  Button,
  Input,
  Text,
  Box,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { LuCloudUpload, LuCircleCheck, LuX } from "react-icons/lu";
import { toaster } from "~/components/ui/toaster";

interface EmailUploadProps {
  onFileUpload: (file: File | null) => void;
}

export default function EmailUpload({ onFileUpload }: EmailUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [".txt", ".pdf"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      toaster.create({
        title: "Formato inválido",
        description: "Use apenas .txt ou .pdf",
        type: "error",
        duration: 4000,
        closable: true,
      });
      e.target.value = "";
      setUploadedFile(null);
      return;
    }
    setUploadedFile(file);
    onFileUpload(file);
  };

  const handleClear = () => {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onFileUpload(null);
  };

  return (
    <VStack width="100%">
      <Input
        type="file"
        accept=".txt,.pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        display="none"
      />

      <Box
        w="100%"
        border="2px dashed"
        borderColor={hover ? "blue.400" : "gray.300"}
        borderRadius="md"
        p={6}
        textAlign="center"
        cursor="pointer"
        transition="all 0.2s"
        onClick={() => fileInputRef.current?.click()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <HStack justify="center">
          {uploadedFile ? (
            <>
              <Icon as={LuCircleCheck} w={6} h={6} color="green.400" />
              <Text fontWeight="bold">{uploadedFile.name}</Text>
              <Button
                size="xs"
                variant="ghost"
                colorScheme="red"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <LuX />
                Limpar
              </Button>
            </>
          ) : (
            <>
              <Icon as={LuCloudUpload} w={8} h={8} color="blue.400" />
              <Text fontWeight="bold">Clique ou arraste o arquivo aqui</Text>
            </>
          )}
        </HStack>
        {!uploadedFile && (
          <Text fontSize="sm" color="gray.500" mt={2}>
            Somente arquivos .txt ou .pdf
          </Text>
        )}
      </Box>

      <Text fontSize="md" color="gray.500" textAlign="center">
        ou
      </Text>
    </VStack>
  );
}
