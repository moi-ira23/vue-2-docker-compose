import Vue from "vue";
import gameStorage from '@/GameEngine/gameStorage';
import levels from '@/assets/levels.json';
import { validateFlower, validateWall, validateGround } from "@/GameEngine/GridValidationFunctions"

export default {
  namespaced: true,
  state: {
    grid: [],
    selectedGrid: [],
    cellTypes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    currentLevel: null,
    isCustomLevel: false,
    validationResults: {
      flower: "",
      wall: "",
      ground: "",
    }
  },
  getters: {
    getGrid: (state) => state.grid,
    gridRows: (state) => state.grid.length,
    gridColumns: (state) => state.grid[0].length,
    selectedGrid: (state) => state.selectedGrid,
    cellTypes: (state) => state.cellTypes,
    currentLevel: (state) => state.currentLevel,
    isCustomLevel: (state) => state.isCustomLevel,
    getValidationResults: (state) => state.validationResults,
  },
  mutations: {
    setGrid(state, grid) {
      state.grid = grid;
      validateGrid(state)
    },
    setSelectedGrid(state, selectedGrid) {
      state.selectedGrid = selectedGrid;
    },
    setCurrentLevel(state, { levelNumber, isCustom }) {
      state.currentLevel = levelNumber;
      state.isCustomLevel = isCustom;
    },
    updateCell(state, { row, col, cellType }) {
      state.grid[row][col] = cellType;
      validateGrid(state)
    },
    toggleSelectedCell(state, { row, col }) {
      Vue.set(state.selectedGrid[row], col, !state.selectedGrid[row][col]);
    },
    setGridSize(state, { rows, columns }) {
      const defaultCellType = 2;
      if (state.grid.length < rows) {
        for (let i = state.grid.length; i < rows; i++) {
          state.grid.push(new Array(columns).fill(defaultCellType));
          state.selectedGrid.push(new Array(columns).fill(false));
        }
      } else if (state.grid.length > rows) {
        state.grid = state.grid.slice(0, rows);
        state.selectedGrid = state.selectedGrid.slice(0, rows);
      }

      state.grid = state.grid.map((row) => {
        if (row.length < columns) {
          return [...row, ...new Array(columns - row.length).fill(defaultCellType)];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });

      state.selectedGrid = state.selectedGrid.map((row) => {
        if (row.length < columns) {
          return [...row, ...new Array(columns - row.length).fill(false)];
        } else if (row.length > columns) {
          return row.slice(0, columns);
        }
        return row;
      });

      validateGrid(state)
    },
  },
  actions: {
    loadLevel({ commit }, payload) {
      const { levelNumber, isCustom } = payload;
      const levelData = gameStorage.loadLevel(levelNumber, isCustom);
      console.log(levelNumber, isCustom)
      console.log("levelData", levelData)
      if (levelData) {
        commit('setGrid', levelData);
        commit('setSelectedGrid', levelData.map(row => row.map(() => false)));
        commit('setCurrentLevel', { levelNumber, isCustom });
      } else {
        console.error("Level not found");
      }
    },
    saveCustomLevel({ state }, levelNumber) {
      gameStorage.saveCustomLevel(state.grid, levelNumber);
    },
    saveLevelToFile({ state }, fileName = 'level.json') {
      gameStorage.saveLevelToFile(state.grid, fileName);
    },
    loadLevelFromFile({ commit }, file) {
      gameStorage.loadLevelFromFile(file)
        .then((levelData) => {
          commit('setGrid', levelData);
          commit('setSelectedGrid', levelData.map(row => row.map(() => false)));
          commit('setCurrentLevel', { levelNumber: gameStorage.getNumberOfLevels(true), isCustom: true });
        })
        .catch(error => console.error(error));
    },
    updateCell({ commit }, payload) {
      commit("updateCell", payload);
    },
    toggleSelectedCell({ commit }, payload) {
      commit("toggleSelectedCell", payload);
    },
    setGridSize({ commit }, payload) {
      commit("setGridSize", payload);
    },
  },
};

function validateGrid(state) {
  const flowerValidation = validateFlower(state.grid);
  const wallValidation = validateWall(state.grid);
  const groundValidation = validateGround(state.grid);
  state.validationResults = {
    flower: flowerValidation,
    wall: wallValidation,
    ground: groundValidation,
  }
}
