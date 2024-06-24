import { create } from 'zustand';
interface FormState {
  step: number;
  formData: {
    [key: string]: any;
  };
  fileList: any[];
  setFileList: (fileList: any[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  setFormData: (data: { [key: string]: any }) => void;
}

const useFormStore = create<FormState>((set) => ({
  step: 1,
  formData: {},
  fileList: [],
  setFileList: (fileList) => set({ fileList }),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
}));

export default useFormStore;
