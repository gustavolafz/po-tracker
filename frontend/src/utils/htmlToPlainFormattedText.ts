// src\utils\htmlToPlainFormattedText.ts

export function htmlToPlainFormattedText(html: string): string {
  let output = html;

  // Parágrafos → quebra dupla
  output = output.replace(/<\/p>\s*/gi, "\n\n");
  output = output.replace(/<p[^>]*>/gi, "");

  // Negrito
  output = output.replace(/<(strong|b)>/gi, "**");
  output = output.replace(/<\/(strong|b)>/gi, "**");

  // Itálico
  output = output.replace(/<(em|i)>/gi, "_");
  output = output.replace(/<\/(em|i)>/gi, "_");

  // Listas com marcadores
  output = output.replace(/<ul[^>]*>\s*/gi, "");
  output = output.replace(/<\/ul>/gi, "");
  output = output.replace(/<li[^>]*>/gi, "• ");
  output = output.replace(/<\/li>/gi, "\n");

  // Listas numeradas
  let olIndex = 1;
  output = output.replace(/<ol[^>]*>\s*/gi, "");
  output = output.replace(/<\/ol>/gi, "");
  output = output.replace(/<li[^>]*>/gi, () => `${olIndex++}. `);

  // Remove outras tags residuais
  output = output.replace(/<[^>]+>/g, "");

  // Limpa espaços duplicados e bordas
  return output.trim();
}
