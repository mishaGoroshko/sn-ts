export const updateObjectInArray = (items: any[], itemId: number, keyName: string, newEntries: {}) => {
    return items.map(el => el[keyName] === itemId ? {
        ...el,
        ...newEntries
    } : el)
}