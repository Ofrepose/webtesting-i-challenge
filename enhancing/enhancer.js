module.exports = {
  success,
  fail,
  repair,
  get,
};

const checkType = (item) =>{
    if(typeof(item) != typeof({}) || Array.isArray(item)){
        throw "item cannot be a string"
    }
}

function success(item) {
    checkType(item);

    return item.enhancement < 20 ? { ...item, enhancement: item.enhancement + 1 } :
    { ... item}

}

function fail(item) {
    checkType(item);


    return item.durability < 6 ? { ...item, durability:0, name:`[broken]${item.name}`, enhancement:0}:
        item.enhancement < 15 ?
        { ...item, durability: item.durability - 5} :
        item.enhancement === 15 ? { ...item, durability: item.durability - 10} :
            item.enhancement > 15 ? { ...item, durability: item.durability - 10,
                enhancement: item.enhancement - 1} : null

}

function repair(item) {
    checkType(item);

    return { ...item, durability: 100 };
}

function get(item) {
    checkType(item);
    return item.enhancement > 0 ? { ...item, name:`[+${item.enhancement}]${item.name}`}
    : { ...item}

}

