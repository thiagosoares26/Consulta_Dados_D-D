# 🐉 D&D 5e App (React Native)

Aplicativo mobile desenvolvido em React Native para consultar informações da 5ª edição de Dungeons & Dragons.

---

## 📡 API utilizada

Foi utilizada a API pública:

👉 https://www.dnd5eapi.co/?ref=freepublicapis.com

Essa API fornece dados sobre:
- Feitiços (Spells)
- Classes
- Habilidades (Features)
- Monstros (Monsters)

---

## 🚀 Como rodar o projeto

### 1. Instalar dependências
```bash
npm install
npx expo start
```

---

## ⚙️ Funcionalidades

🔎 Buscar dados digitando:
- spells/fireball
- classes/barbarian
- features/second-wind
- monsters/aboleth
  
📚 Listagem por categoria:
- Feitiços
- Classes
- Habilidades
- Monstros
  
🧾 Exibição detalhada:
- Spells: nível, escola, tempo, alcance, descrição
- Monsters: CR, tipo, HP, atributos e habilidades
- Classes: vida (hit die), proficiências, saving throws e subclasses
- Features: nível, classe e descrição
  
🖼️ Exibição de imagem para monstros (quando disponível)

🧹 Botão de limpar:
- Reseta busca
- Limpa resultados
- Oculta listas
