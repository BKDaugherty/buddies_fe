import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
	key: "primary",
	storage,
	stateReconciler: autoMergeLevel2,
};

// On browser refresh, merge stored state in localStorage with the initialState of the root
// reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancer = composeWithDevTools(
	// Add thunk middleware to allow for asynchronous dispatch via the store.
	// Also, pass every thunk the buddies_service API
	applyMiddleware(thunk)
);

const storeGenerator = () => {
	const store = createStore(persistedReducer, composedEnhancer);
	const persistor = persistStore(store);
	return { store, persistor };
};

export default storeGenerator;
