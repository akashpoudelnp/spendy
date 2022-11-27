export const filterName = (data, inputValue) => {
    // Create a dynamic regex expression object with ignore case sensitivity
    const re = new RegExp(_.escapeRegExp(inputValue), "i");
    const clonedData = _.cloneDeep(data);
    const results = clonedData.filter((object) => {
        return object.list.filter((item) => {
            if (re.test(item.name)) {
                // Calculates the characters to highlight in text based on query
                const matches = match(item.name, inputValue);
                // Breaks the given text to parts based on matches.
                // After that create a new property named `parts` and assign an array to it.
                item["parts"] = parse(item.name, matches);
                return true;
            } else {
                return false;
            }
        }).length > 0 || re.test(object.name);
    });
    return results;
};