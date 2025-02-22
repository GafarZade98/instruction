import { create } from "zustand";

type UserStateType = {
    receiverUserId: number | null;
    receiverUserName: string;
    setReceiverUserId: (val: number) => void;
    setReceiverUserName: (val: string) => void;
};

export const useReceiverUserState = create<UserStateType>((set) => ({
    receiverUserId: null,
    receiverUserName: "",
    setReceiverUserId: (val) => set({ receiverUserId: val }),
    setReceiverUserName: (val) => set({ receiverUserName: val }),
}));

export const useMessagesState = create((set) => ({
    messages: [],
    setMessage: (val) =>
        set((state) => ({ messages: [val, ...state.messages] })),
    setMessages: (val) => set({ messages: val }),
}));
