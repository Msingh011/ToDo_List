

export const deleteHandle =(index) => {
    const formaFields = [...showName];
    formaFields.splice(index, 1);
    localStorage.setItem("Names", JSON.stringify(formaFields));
    setNames(formaFields);
};