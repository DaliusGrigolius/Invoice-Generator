export const formatCamelCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^[a-z]/, (str) => {
        return str.toUpperCase();
    });
};

export const numberFields = ["price", "height", "width", "weight", "volume", "unitsPerPackage", "discount"];

export const units = { price: " (Eu)", height: " (cm)", width: " (cm)", weight: " (kg)", volume: " (l)", discount: " (%)", duration: " (h)" };

export const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        height: 'fit-content',
        textAlign: 'center',
    }
};