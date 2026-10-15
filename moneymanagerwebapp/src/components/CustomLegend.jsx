const CustomLegend = ({ payload }) => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
            {payload?.map((entry, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2"
                >
                    <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm font-semibold text-gray-700">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;