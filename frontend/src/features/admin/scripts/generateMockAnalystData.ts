// src\features\admin\scripts\generateMockAnalystData.tsx

import { faker } from "@faker-js/faker";
import { writeFile } from "fs/promises";
import path from "path";
import type { Analyst } from "@/features/admin/types";

const analystData: Analyst[] = [];

for (let i = 0; i < 2000; i++) {
  const id = `ANL-${faker.string.alphanumeric(6).toUpperCase()}`;
  const name = faker.person.fullName();
  const email = faker.internet.email({ firstName: name.split(" ")[0], lastName: name.split(" ")[1] });
  const pedidosResponsaveis = faker.number.int({ min: 3, max: 15 });

  analystData.push({
    id,
    name,
    email,
    pedidosResponsaveis,
  });
}

async function salvarMocks() {
  const filePath = path.resolve("src/features/admin/data/generatedMockAnalystData.ts");
  const conteudo =
    `// Gerado automaticamente por generateMockAnalystData.ts\n\n` +
    `import type { Analyst } from "@/features/admin/types";\n\n` +
    `export const analystData: Analyst[] = ${JSON.stringify(analystData, null, 2)};\n`;

  await writeFile(filePath, conteudo, "utf-8");
  console.log("✅ Mock de analistas salvo em src/features/admin/data/generatedMockAnalystData.ts");
}

salvarMocks();
