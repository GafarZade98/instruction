import { create } from "zustand";

type UserStateType = {
    receiverUserId: number | null;
    receiverUserName: string;
    setReceiverUserId: (val: number) => void;
    setReceiverUserName: (val: string) => void;
};
type useMessagesStateType = {
    messages: any[];
    setMessage: (val: any) => void;
    setMessages: (val: any) => void;
};

export const useReceiverUserState = create<UserStateType>((set) => ({
    receiverUserId: null,
    receiverUserName: "",
    setReceiverUserId: (val) => set({ receiverUserId: val }),
    setReceiverUserName: (val) => set({ receiverUserName: val }),
}));

export const useMessagesState = create<useMessagesStateType>((set) => ({
    messages: [],
    setMessage: (val) =>
        set((state) => {
            // Prevent duplicates
            if (state.messages.some((msg) => msg.id === val.id)) {
                return state;
            }
            return { messages: [...state.messages, val] };
        }),
    //FIXME why do you even need 2 of them?
    setMessages: (val) => set({ messages: val }),
}));
