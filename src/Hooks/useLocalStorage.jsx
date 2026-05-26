const useLocalStorage = (key) => {
  // Get items
  const getItems = () => {
    const storedItems = localStorage.getItem(key);

    return storedItems ? JSON.parse(storedItems) : [];
  };

  // Add item
  const addItem = (item) => {
    const existingItems = getItems();

    // Prevent duplicate items
    const alreadyExists = existingItems.includes(item);

    if (alreadyExists) return false;

    const updatedItems = [...existingItems, item];

    localStorage.setItem(key, JSON.stringify(updatedItems));

    return true;
  };

  // Remove item
  const removeItem = (item) => {
    const existingItems = getItems();

    const updatedItems = existingItems.filter(
      (storedItem) => storedItem !== item,
    );

    localStorage.setItem(key, JSON.stringify(updatedItems));
  };

  // Clear all
  const clearItems = () => {
    localStorage.removeItem(key);
  };

  // Check exists
  const isExists = (item) => {
    return getItems().includes(item);
  };

  return {
    getItems,
    addItem,
    removeItem,
    clearItems,
    isExists,
  };
};

export default useLocalStorage;
