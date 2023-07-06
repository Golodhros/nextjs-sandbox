import { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import { WebApp } from '@/templates/WebApp';

import type { FileTreeNode } from '../types';

const API_ENDPOINT = '/api/files';
const RIGHT_CHEVRON_PATH = '/assets/icons/right-chevron.svg';
const DOWN_CHEVRON_PATH = '/assets/icons/down-chevron.svg';
const CHEVRON_SIZE = '16px';

export type EnhancedFileTreeNode = {
  name: string;
  kind: 'directory' | 'file';
  isSelected: boolean;
  isExpanded: boolean;
  children?: EnhancedFileTreeNode[];
};

const enhanceFileTree = (node: FileTreeNode): EnhancedFileTreeNode => {
  const { name, kind, children } = node;

  return {
    name,
    kind,
    isSelected: false,
    isExpanded: false,
    children: children && children.map((child) => enhanceFileTree(child)),
  };
};

const getClassForKind = (kind: string): string => {
  if (kind === 'file') {
    return 'is-file';
  }
  return 'is-folder';
};

type TreeNodeProps = {
  data: EnhancedFileTreeNode;
};

type DirectoryButtonProps = {
  isSelected: boolean;
  name: string;
  onNodeClick: () => void;
  isNodeExpanded: boolean;
};

const DirectoryButton = ({
  isSelected,
  name,
  onNodeClick,
  isNodeExpanded,
}: DirectoryButtonProps): JSX.Element => {
  const expansionMarker = isNodeExpanded ? (
    <img
      src={DOWN_CHEVRON_PATH}
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      alt=""
    />
  ) : (
    <img
      src={RIGHT_CHEVRON_PATH}
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      alt=""
    />
  );
  const icon = '📁';

  return (
    <button
      className={isSelected ? 'is-selected' : ''}
      onClick={onNodeClick}
      type="button"
    >
      {expansionMarker}
      {icon} {name}
    </button>
  );
};

type FileElementProps = {
  isSelected: boolean;
  name: string;
};

const FileElement = ({ isSelected, name }: FileElementProps): JSX.Element => {
  const icon = '📄';

  return (
    <span className={isSelected ? 'is-selected' : ''}>
      {icon} {name}
    </span>
  );
};

const TreeNode = ({ data }: TreeNodeProps): JSX.Element => {
  const { name, kind, children, isExpanded, isSelected } = data;
  const [isNodeExpanded, setIsNodeExpanded] = useState<boolean>(isExpanded);

  const handleNodeClick = () => {
    if (kind === 'directory') {
      setIsNodeExpanded(!isNodeExpanded);
    }
  };

  const hasChildren = children && children.length > 0;
  const isExpandable = kind === 'directory' && hasChildren;
  const hasChildrenRendered = isExpandable && isNodeExpanded;
  const Element = kind === 'directory' ? DirectoryButton : FileElement;

  return (
    <div className={isNodeExpanded ? 'is-expanded' : 'is-collapsed'}>
      <Element
        name={name}
        isSelected={isSelected}
        onNodeClick={handleNodeClick}
        isNodeExpanded={isNodeExpanded}
      />
      {hasChildrenRendered &&
        children.map((child) => (
          <div
            key={`${child.name}:${Math.random() * 1000}`}
            className={getClassForKind(kind)}
          >
            <TreeNode data={child} />
          </div>
        ))}
    </div>
  );
};

type FileManagerProps = {
  isLoading: boolean;
  data: FileTreeNode;
};
const FileManager: React.FC<FileManagerProps> = ({ isLoading, data }) => {
  // TODO: make it a skeleton component
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const enhancedFileTree = enhanceFileTree(data);

  return (
    <div>
      <h2 className="h2">File Manager</h2>
      <TreeNode data={enhancedFileTree} />
    </div>
  );
};

// TODO
// -
const Index = () => {
  const [data, setData] = useState<FileTreeNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((parsedData) => {
        setIsLoading(false);
        setData(parsedData.data as FileTreeNode);
      });
  }, []);

  console.log('data', data);

  return (
    <WebApp
      meta={
        <Meta
          title="All In Bites"
          description="All In Bites page description"
        />
      }
      title="All In Bites Sandbox"
    >
      {data && <FileManager isLoading={isLoading} data={data} />}
    </WebApp>
  );
};

export default Index;
