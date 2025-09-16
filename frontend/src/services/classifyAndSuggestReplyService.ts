export const classifyAndSuggestReply = async (emailContent: string | File) => {
  const formData = new FormData();
  if (emailContent instanceof File) {
    formData.append("file", emailContent);
  } else {
    formData.append("text", emailContent);
  }

  const response = await fetch("https://case-auto-u.fly.dev/classify-email/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to classify email and suggest reply");
  }

  return response.json();
};
