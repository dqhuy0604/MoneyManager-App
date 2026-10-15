export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || amount === "" || isNaN(amount)) {
        return "";
    }

    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0
    }).format(Number(amount));
};



export const prepareIncomeLineChartData = (transactions = []) => {
    if (!Array.isArray(transactions)) return [];

    const groupedData = transactions.reduce((acc, transaction) => {
        const date = transaction.date?.slice(0, 10);
        const amount = Number(transaction.amount);

        if (!date || !Number.isFinite(amount)) {
            return acc;
        }

        if (!acc[date]) {
            acc[date] = {
                date,
                amount: 0,
                details: []
            };
        }

        acc[date].amount += amount;

        acc[date].details.push({
            id: transaction.id,
            name: transaction.name || "Thu nhập",
            categoryName: transaction.categoryName || "Khác",
            amount
        });

        return acc;
    }, {});

    return Object.values(groupedData).sort(
        (a, b) => a.date.localeCompare(b.date)
    );
};

export const prepareExpenseLineChartData = (transactions = []) => {
    if (!Array.isArray(transactions)) return [];

    const groupedData = transactions.reduce((acc, transaction) => {
        const date = transaction.date?.slice(0, 10);
        const amount = Number(transaction.amount);

        if (!date || !Number.isFinite(amount)) {
            return acc;
        }

        if (!acc[date]) {
            acc[date] = {
                date,
                amount: 0,
                details: []
            };
        }

        acc[date].amount += amount;

        acc[date].details.push({
            id: transaction.id,
            name: transaction.name || "Chi tiêu",
            categoryName: transaction.categoryName || "Khác",
            amount
        });

        return acc;
    }, {});

    return Object.values(groupedData).sort(
        (a, b) => a.date.localeCompare(b.date)
    );
};

