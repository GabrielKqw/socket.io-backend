# GTIBOT - Chatbot no WhatsApp usando Dialogflow

## Visão Geral do Projeto
O GTIBOT é um chatbot desenvolvido para o WhatsApp, permitindo aos usuários interagir com o chatbot por meio do aplicativo de mensagens. O chatbot utiliza o Dialogflow para processar as mensagens dos usuários, compreender suas intenções e fornecer respostas relevantes e personalizadas.

## Arquitetura do Sistema
O sistema GTIBOT é composto pelos seguintes componentes:
- Servidor Backend (Node.js, Express.js, NestJS)
- Cliente de Integração com o WhatsApp (WhatsApp Business API)
- Serviço de Processamento de Linguagem Natural (Dialogflow)
- Banco de Dados (MongoDB)

## Configuração e Instalação
1. Configuração do WhatsApp Business API:
   - Siga as instruções fornecidas pelo WhatsApp Business API para obter acesso e configurar a integração do WhatsApp Business API.
   - Registre um número de telefone comercial verificado para uso com a API.
   - Configure o ambiente de execução para receber e enviar mensagens.

2. Configuração do Dialogflow:
   - Crie um projeto no Dialogflow para gerenciar as interações do chatbot.
   - Defina intents para capturar as intenções do usuário.
   - Configure respostas adequadas para cada intent.
   - Treine o modelo de linguagem para melhorar a compreensão do chatbot.

3. Configuração do Backend:
   - Instale as dependências necessárias para o servidor backend, como Node.js, Express.js ou NestJS.
   - Configure as rotas e os controladores para receber mensagens do WhatsApp Business API.
   - Implemente a lógica de envio das mensagens para o Dialogflow e o processamento das respostas recebidas.

4. Configuração do Banco de Dados:
   - Instale e configure o MongoDB (ou outro banco de dados de sua escolha) para armazenar informações relevantes, como histórico de conversas e preferências do usuário.

## Fluxo de Conversação
1. O usuário envia uma mensagem para o número de telefone do GTIBOT no WhatsApp.
2. A mensagem é recebida pelo WhatsApp Business API e encaminhada para o servidor backend.
3. O servidor backend envia a mensagem para o Dialogflow para processamento.
4. O Dialogflow analisa a mensagem, compreende a intenção do usuário e gera uma resposta adequada.
5. A resposta é enviada de volta para o servidor backend.
6. O servidor backend encaminha a resposta para o WhatsApp Business API.
7. O WhatsApp Business API envia a resposta de volta ao usuário no WhatsApp.

## Segurança
- Certifique-se de seguir as diretrizes de segurança fornecidas pelo WhatsApp Business API para proteger o acesso ao seu número de telefone comercial verificado.
- Implemente práticas de segurança adequadas no seu servidor backend, como autenticação e autorização adequadas, validação de entrada e proteção de dados sensíveis.

## Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias, correções ou novos recursos.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).
