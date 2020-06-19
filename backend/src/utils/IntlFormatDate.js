export default (data) => {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        month: '2-digit',
        day: '2-digit',               
        year: 'numeric',
    });

    return formatter.format(data);
};