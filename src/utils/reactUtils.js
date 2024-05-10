const formatPriceDisplay = price => `$${price}`;

const generateUniqueId = () => {
    const uniqueId = Math.round(Math.random() * 10 * Date.now());

    return uniqueId;
};

export {
    formatPriceDisplay,
    generateUniqueId
};