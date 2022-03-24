import React from 'react';

export const StoreContext = React.createContext({})

type ProviderType = {
    store: any
}

export const Provider: React.FC<ProviderType> = ({store, children}) => {
    return <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
}
