import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CategoryChart({ products }) {
  const categoryData = products.reduce((acc, product) => {
    const existingCategory = acc.find(
      (item) => item.name === product.category
    );

    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({
        name: product.category,
        value: 1,
      });
    }

    return acc;
  }, []);

  const sortedCategories = categoryData
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedCategories}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke="#e2e8f0"
          />

          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={90}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 11 }}
          />

          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          />

          <Bar
            dataKey="value"
            fill="#6366f1"
            radius={[0, 6, 6, 0]}
            barSize={24}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;