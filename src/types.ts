export type Data = {
  data: FileTreeNode;
};

export type FileTreeNode = {
  name: string;
  kind: 'directory' | 'file';
  size?: string;
  modified?: string;
  children?: FileTreeNode[];
};

export type APIResponseData = {
  data?: FileTreeNode;
  error?: string;
};
