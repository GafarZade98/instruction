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
