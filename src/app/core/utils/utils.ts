export const IsNullEmptyUndefined = (value: any) =>{
    if (value.length === 0 || value === null || value === undefined) {
        return true;
    }
    return false;
}