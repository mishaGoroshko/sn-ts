import React from 'react';
import {StoreType} from "./Redux/store";

export const StoreContext = React.createContext({} as StoreType)

type ProviderType = {
    store: StoreType
}

export const Provider: React.FC<ProviderType> = ({store, children}) => {
    return <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
}
