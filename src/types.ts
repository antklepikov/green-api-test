export type Chat = {
  phoneNumber: string;
  chatId: string;
};

export type Message = {
  id: string;
  text: string;
  direction: 'outgoing' | 'incoming';
};
