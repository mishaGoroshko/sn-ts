export const updateObjectInArray = (items: any[], itemId: string, keyName: string, newEntries: {}) => {
    return items.map(el => el[keyName] === itemId ? {
        ...el,
        ...newEntries
    } : el)
}