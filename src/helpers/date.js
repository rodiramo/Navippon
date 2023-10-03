/**
 * Transforma un objeto Date a un string con formato:
 * DD/MM/AAAA hh:mm:ss
 * 
 * @param {Date} date 
 * @return {string}
 */
export function formatDate(date) {
    // Vamos a usar el objeto Intl para transformar el Date.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
    return (new Intl.DateTimeFormat('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    }).format(date)).replace(',', '');
}