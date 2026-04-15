export type AppId = 'command' | 'files' | 'ai' | 'settings' | 'aegis' | 'map' | 'comms' | 'drones' | 'personnel' | 'browser';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  parentId: string | null;
}
