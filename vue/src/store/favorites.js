export default {
    namespaced: true,
    state: {
        favorites: JSON.parse(localStorage.getItem("favorites")) ?? []
    },
    getters: {
        getFavorites: (state) => state.favorites,
        isFavorites: (state) => (item) => {
            return state.favorites.findIndex(fItem => fItem.id === item.id) !== -1 ? true : false
        },
    },
    mutations: {
        addToFavorites: (state, item) => {
            const index = state.favorites.findIndex(fItem => fItem.id === item.id)
            if(index === -1) {
                state.favorites.push(item);
                localStorage.setItem("favorites", JSON.stringify(state.favorites))
            }
        },
        removeFromFavorites: (state, item) => {
            const index = state.favorites.findIndex(fItem => fItem.id === item.id)
            if (index !== -1) {
                state.favorites.splice(index, 1);
                localStorage.setItem("favorites", JSON.stringify(state.favorites));
            }
        },
    },
    actions: {
        addToFavorites: (context, item) => {
            context.commit('addToFavorites', item)
        },
        removeFromFavorites: (context, item) => {
            context.commit('removeFromFavorites', item)
        }
    },
}