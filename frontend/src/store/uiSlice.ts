import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from'@reduxjs/toolkit';

import type { ModalType } from '../types';

interface UiState {
  openModal: ModalType;
  editingTaskId: number | null;
  editingProjectId: number | null;
}

const initialState: UiState = {
  openModal: null,
  editingTaskId: null,
  editingProjectId: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
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
    openLoginModal(state) {
      state.openModal = 'login';
      state.editingTaskId = null;
      state.editingProjectId = null;
    },
    openRegisterModal(state) {
      state.openModal = 'register';
      state.editingTaskId = null;
      state.editingProjectId = null;
    },
    closeModal(state) {
      state.openModal = null;
      state.editingTaskId = null;
      state.editingProjectId = null;
    },
  },
});

export const {
  openCreateTaskModal,
  openCreateProjectModal,
  openEditProjectModal,
  openEditProjectTaskModal,
  openCreateProjectTaskModal,
  openLoginModal,
  openRegisterModal,
  closeModal,
} = uiSlice.actions;

export default uiSlice.reducer;