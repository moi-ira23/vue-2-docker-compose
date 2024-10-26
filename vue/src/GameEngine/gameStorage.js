// src/utils/gameManager.js
import levels from '@/assets/levels.json';

const LOCAL_STORAGE_KEY = 'customLevels';

const gameStorage = {
  loadLevel(levelNumber, isCustom=false) {
    if (isCustom) {
      const customLevels = this.getCustomLevels();
      return customLevels[levelNumber - 1];
    }
    return levels.levels[levelNumber];
  },

  getCustomLevels() {
    const savedLevels = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedLevels ? JSON.parse(savedLevels) : [];
  },

  saveCustomLevel(levelData, levelNumber = null) {
    const customLevels = this.getCustomLevels();
    if (levelNumber === null)
      customLevels.push(levelData);
    else
      customLevels[levelNumber] = levelData;

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customLevels));
  },

  saveLevelToFile(levelData, fileName = 'level.json') {
    const blob = new Blob([JSON.stringify(levelData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  },

  loadLevelFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const levelData = JSON.parse(event.target.result);
  
          const customLevels = this.getCustomLevels();
          customLevels.push(levelData);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(customLevels));
  
          resolve(levelData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  },

  getNumberOfLevels(isCustom) {
    return isCustom ? this.getCustomLevels().length : Object.keys(levels.levels).filter(key => key !== "editor").length;
  }
};

export default gameStorage;
