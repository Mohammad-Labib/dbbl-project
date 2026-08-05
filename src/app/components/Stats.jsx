// components/Stats.jsx

export default function Stats({ statsData }) {

  const defaultStats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Total Searches', value: '1.2M+' },
    { label: 'Verified Resources', value: '10,000+' },
    { label: 'Customer Satisfaction', value: '99.9%' },
  ];

  const stats = statsData || defaultStats;

  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100/80 hover:shadow-md transition-shadow"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
                {stat.value}
              </p>
              <p className="mt-2 text-sm sm:text-base font-medium text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}