import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from'@reduxjs/toolkit';

import type { ModalType, PageType } from '../types';

interface UiState {
  currentPage: PageType;
  openModal: ModalType;
  editingTaskId: number | null;
  editingProjectId: number | null;
}

const initialState: UiState = {
  currentPage: 'tasks',
  openModal: null,
  editingTaskId: null,
  editingProjectId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<PageType>) {
      state.currentPage = action.payload;
    },
    openCreateTaskModal(state) {
      state.openModal = 'createTask';
      state.editingTaskId = null;
    },
    openCreateProjectModal(state) {
      state.openModal = 'createProject';
    },
    openCreateProjectTaskModal(state) {
      state.openModal = 'createProjectTask';
    },
    openEditProjectModal(state, action: PayloadAction<number>) {
      state.openModal = 'editProject';
      state.editingProjectId = action.payload;
      state.editingTaskId = null;
    },
    openEditProjectTaskModal(state, action: PayloadAction<number>) {
      state.openModal = 'editProjectTask';
      state.editingTaskId = action.payload;
    },
    closeModal(state) {
      state.openModal = null;
      state.editingTaskId = null;
      state.editingProjectId = null;
    },
  },
});

export const {
  setPage,
  openCreateTaskModal,
  openCreateProjectModal,
  openEditProjectModal,
  openEditProjectTaskModal,
  openCreateProjectTaskModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;