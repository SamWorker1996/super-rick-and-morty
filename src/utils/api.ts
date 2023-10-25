interface NormalizedResult<T, ID> {
    map: Map<ID, T>;
    ids: ID[];
}

/**
 * Normalized Array to Map,
 * return {
 *      Map<Id, Item>,
 *      Ids: Id[]
 * }
 */
export function normalizeArray<T, ID extends keyof T>(array: T[], idKey: ID): NormalizedResult<T, T[ID]> {
    const map = new Map<T[ID], T>();
    const ids: T[ID][] = [];

    array.forEach(item => {
        const id = item[idKey];
        map.set(id, item);
        ids.push(id);
    })

    return {
        map,
        ids
    }
}