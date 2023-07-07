/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import type { FileTreeNode } from '../types';

const API_ENDPOINT = '/api/files';
const RIGHT_CHEVRON_PATH = '/assets/icons/right-chevron.svg';
const DOWN_CHEVRON_PATH = '/assets/icons/down-chevron.svg';
const CHEVRON_SIZE = '16px';
const PADDING_INDENT_MULTIPLIER = 16;

export type EnhancedFileTreeNode = {
  name: string;
  kind: 'directory' | 'file';
  isSelected: boolean;
  isExpanded: boolean;
  id: string;
  children?: EnhancedFileTreeNode[];
};

const enhanceFileTree = (node: FileTreeNode): EnhancedFileTreeNode => {
  const { name, kind, children } = node;

  return {
    id: uuidv4(),
    name,
    kind,
    isSelected: false,
    isExpanded: false,
    children: children && children.map((child) => enhanceFileTree(child)),
  };
};

type DirectoryButtonProps = {
  isNodeSelected: boolean;
  name: string;
  onNodeClick: () => void;
  isNodeExpanded: boolean;
  level: number;
};

const DirectoryButton = ({
  isNodeSelected,
  name,
  onNodeClick,
  isNodeExpanded,
  level,
}: DirectoryButtonProps): JSX.Element => {
  const expansionMarker = isNodeExpanded ? (
    <img
      className="px-1"
      src={DOWN_CHEVRON_PATH}
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      alt=""
    />
  ) : (
    <img
      className="px-1"
      src={RIGHT_CHEVRON_PATH}
      width={CHEVRON_SIZE}
      height={CHEVRON_SIZE}
      alt=""
    />
  );
  const icon = '📁';

  return (
    <button
      style={{ paddingLeft: `${level * PADDING_INDENT_MULTIPLIER}px` }}
      className={`flex w-full content-center border border-white hover:bg-sky-100 ${
        isNodeSelected ? 'border border-sky-50 bg-sky-100' : ''
      }`}
      onClick={onNodeClick}
      type="button"
    >
      {expansionMarker}
      {icon} {name}
    </button>
  );
};

type FileButtonProps = {
  isNodeSelected: boolean;
  onNodeClick: () => void;
  name: string;
  level: number;
};

const FileButton = ({
  isNodeSelected,
  name,
  onNodeClick,
  level,
}: FileButtonProps): JSX.Element => {
  const icon = '📄';

  return (
    <button
      style={{ paddingLeft: `${level * PADDING_INDENT_MULTIPLIER}px` }}
      className={`flex w-full content-center border border-white hover:bg-sky-100 ${
        isNodeSelected ? 'border border-sky-50 bg-sky-100' : ''
      }`}
      onClick={onNodeClick}
      type="button"
    >
      {icon} {name}
    </button>
  );
};

type TreeNodeProps = {
  data: EnhancedFileTreeNode;
  level: number;
  onClick?: (id: string) => void;
};

const TreeNode = ({ data, level, onClick }: TreeNodeProps): JSX.Element => {
  const { name, kind, children, isExpanded, isSelected, id } = data;
  const [isNodeExpanded, setIsNodeExpanded] = useState<boolean>(isExpanded);
  const [isNodeSelected, setIsNodeSelected] = useState<boolean>(isSelected);

  useEffect(() => {
    setIsNodeExpanded(isExpanded);
  }, [isExpanded]);

  const handleNodeClick = () => {
    if (kind === 'directory') {
      setIsNodeExpanded(!isNodeExpanded);
    }
    setIsNodeSelected(!isNodeSelected);
    onClick?.(id);
  };
  const handleChildClick = (childId: string) => {
    onClick?.(childId);
  };

  const hasChildren = children && children.length > 0;
  const isExpandable = kind === 'directory' && hasChildren;
  const hasChildrenRendered = isExpandable && isNodeExpanded;
  const Element = kind === 'directory' ? DirectoryButton : FileButton;
  const nextLevel = level + 1;

  return (
    <div>
      <Element
        level={level}
        name={name}
        onNodeClick={handleNodeClick}
        isNodeExpanded={isNodeExpanded}
        isNodeSelected={isNodeSelected}
      />
      {hasChildrenRendered &&
        children.map((child, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={id + idx}>
            <TreeNode
              data={child}
              level={nextLevel}
              onClick={handleChildClick}
            />
          </div>
        ))}
    </div>
  );
};

const toggleIsSelectedInTreeState = (
  tree: EnhancedFileTreeNode,
  id: string
) => {
  const { children } = tree;

  if (tree.id === id) {
    tree.isSelected = !tree.isSelected;
  }

  if (children) {
    children.forEach((child) => {
      toggleIsSelectedInTreeState(child, id);
    });
  }
};

// TODO: consolidate these two functions
const expandAllInTreeState = (tree: EnhancedFileTreeNode) => {
  const { children } = tree;

  tree.isExpanded = true;
  if (children) {
    children.forEach((child) => {
      expandAllInTreeState(child);
    });
  }

  return tree;
};
const collapseAllInTreeState = (tree: EnhancedFileTreeNode) => {
  const { children } = tree;

  tree.isExpanded = false;
  if (children) {
    children.forEach((child) => {
      collapseAllInTreeState(child);
    });
  }

  return tree;
};

type FileManagerProps = {
  data: FileTreeNode;
};

// TODO
// - Move tree structure into an array of objects for better performance and easier manipulation
const FileManager: React.FC<FileManagerProps> = ({ data }) => {
  const [enhancedFileTree, setEnhancedFileTree] =
    useState<EnhancedFileTreeNode>(enhanceFileTree(data));

  const handleNodeClick = (id: string) => {
    setEnhancedFileTree((prev) => {
      toggleIsSelectedInTreeState(prev, id);

      return prev;
    });
  };

  const handleExpandAll = () => {
    setEnhancedFileTree((prev) => {
      expandAllInTreeState(prev);

      return { ...prev };
    });
  };

  const handleCollapseAll = () => {
    setEnhancedFileTree((prev) => {
      collapseAllInTreeState(prev);

      return { ...prev };
    });
  };

  return (
    <div>
      <h2 className="text-2xl">File Manager</h2>
      <div className="my-1 flex">
        <button
          className="rounded border border-sky-50 bg-sky-500 px-2 hover:bg-sky-100"
          type="button"
          onClick={handleExpandAll}
        >
          Expand all
        </button>
        <button
          className="rounded border border-sky-50 bg-sky-700 px-2 text-white hover:bg-sky-100 hover:text-gray-800"
          type="button"
          onClick={handleCollapseAll}
        >
          Collapse all
        </button>
      </div>
      <TreeNode data={enhancedFileTree} level={0} onClick={handleNodeClick} />
    </div>
  );
};

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

  return (
    <Main
      meta={
        <Meta
          title="All In Bites"
          description="All In Bites page description"
        />
      }
      title="All In Bites Sandbox"
    >
      {isLoading && <div>Loading...</div>}
      {data && <FileManager data={data} />}
    </Main>
  );
};

export default Index;
