import { message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';

export type UploadType = 'url' | 'file';
export type FileNames = { [key: string]: string };
export type UrlItem = { id: string; url: string; name?: string };

interface AddScreenshotModalState {
  uploadType: UploadType;
  setUploadType: (type: UploadType) => void;
  fileList: UploadFile[];
  setFileList: (list: UploadFile[]) => void;
  fileNames: FileNames;
  setFileNames: (names: FileNames) => void;
  urlList: UrlItem[];
  setUrlList: (list: UrlItem[]) => void;
  urlPreviews: { [key: string]: string };
  setUrlPreviews: (
    updater: (prevState: { [key: string]: string }) => { [key: string]: string }
  ) => void;
  handleUploadChange: ({ fileList }: { fileList: UploadFile[] }) => void;
  handleUrlChange: (index: number, value: string) => void;
  handleNameChange: (index: number, value: string) => void;
  handleScreenshotNameChange: (fileUid: string, value: string) => void;
  addUrlField: () => void;
  removeUrlField: (index: number) => void;
  resetAll: () => void;
}

const useAddScreenshotModalStore = create<AddScreenshotModalState>((set, get) => ({
  uploadType: 'url',
  setUploadType: type => set({ uploadType: type }),
  fileList: [],
  setFileList: list => set({ fileList: list }),
  fileNames: {},
  setFileNames: names => set({ fileNames: names }),
  urlList: [{ id: uuidv4(), url: '' }],
  setUrlList: list => set({ urlList: list }),
  urlPreviews: {},
  setUrlPreviews: updater => set(state => ({ urlPreviews: updater(state.urlPreviews) })),
  handleUploadChange: ({ fileList: newFileList }) => {
    const prevList = get().fileList;
    if (
      prevList.length >= 50 ||
      (prevList.length === newFileList.length &&
        prevList.every((f, i) => f.uid === newFileList[i].uid))
    ) {
      return;
    }

    let filesToSet = newFileList;
    if (newFileList.length > 50) {
      filesToSet = newFileList.slice(0, 50);
    }

    set({ fileList: filesToSet });
  },
  handleUrlChange: (index, value) => {
    const urlList = [...get().urlList];
    urlList[index] = { ...urlList[index], url: value };
    set({ urlList });
  },
  handleNameChange: (index, value) => {
    const urlList = [...get().urlList];
    urlList[index] = { ...urlList[index], name: value };
    set({ urlList });
  },
  handleScreenshotNameChange: (fileUid, value) => {
    set({ fileNames: { ...get().fileNames, [fileUid]: value } });
  },
  addUrlField: () => {
    const urlList = get().urlList;
    if (urlList.length >= 100) {
      message.error('En fazla 100 url ekleyebilirsiniz.');

      return;
    }

    set({ urlList: [...urlList, { id: uuidv4(), url: '' }] });
  },
  removeUrlField: index => {
    const urlList = get().urlList.filter((_, i) => i !== index);
    set({ urlList: urlList.length ? urlList : [{ id: uuidv4(), url: '' }] });
  },
  resetAll: () => {
    set({
      uploadType: 'url',
      fileList: [],
      fileNames: {},
      urlList: [{ id: uuidv4(), url: '' }],
      urlPreviews: {},
    });
  },
}));

export default useAddScreenshotModalStore;
