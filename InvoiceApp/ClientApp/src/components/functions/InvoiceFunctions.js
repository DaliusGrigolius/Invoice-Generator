export const discountStyle = { fontSize: "12px", fontWeight: "bold", fontStyle: "italic", color: "green", textAlign: 'right' };
export const totalPriceStyle = { fontSize: "22px", fontWeight: "bold", textAlign: 'center' };
export const vatStyle = { fontSize: "12px", fontWeight: "bold", textAlign: 'center' };
export const totalTextStyle = { fontSize: "22px", fontWeight: "bold", textAlign: 'right' };
export const vatTextStyle = { fontSize: "12px", fontWeight: "bold", textAlign: 'right' };
export const tyMessage = { fontSize: "12px", fontWeight: "bold" };

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
export const formattedDate = `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} / ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;