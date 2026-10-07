export type Credentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type IncomingNotification = {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    chatId?: string;
    senderData?: { chatId: string };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
};
